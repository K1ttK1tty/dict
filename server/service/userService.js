// libs
const bcrypt = require('bcrypt');
const uuid = require('uuid');
// database
const pool = require('../db.js').pool;
// services
const mailService = require('../service/mailService.js');
const tokenService = require('../service/tokenService.js');
// exeptions
const ApiError = require('../exeptions/apiError.js');
// functions
const generateAndSaveToken = require('../Functions/generateAndSaveToken.js').generateAndSaveToken;
const sendActivationMail = require('../Functions/sendActivationMail.js').sendActivationMail;
const getTodayDate = require('../Functions/getTodayDate.js').getTodayDate;

class userService {
    async registration(userName, email, password) {
        const [isPerson] = await pool.query(`select * from user where email=?;`, [email]);
        if (isPerson[0]) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует.`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        await pool.query(`insert into user (name,registrationDate,email,password) values(?,?,?,?);`, [
            userName,
            getTodayDate(),
            email,
            hashPassword,
        ]);

        const activationLink = await sendActivationMail(email);
        const [newPerson] = await pool.query(`select id,name,registrationDate,email from user where email=?;`, [email]);
        await pool.query(`insert into activation (activationLink,user_id) values(?,?);`, [
            activationLink,
            newPerson[0].id,
        ]);

        const tokens = tokenService.generateTokens(newPerson[0]);
        await tokenService.saveToken(newPerson[0].id, tokens.refreshToken);
        const dto = { ...newPerson[0], activationLink };

        return { ...tokens, user: dto };
    }
    async sendActivate(id, email) {
        const activationLink = await sendActivationMail(email);
        await pool.query(`update activation set activationLink=? where user_id=?;`, [activationLink, id]);
    }

    async activate(activationLink) {
        const [user] = await pool.query(`select * from activation where activationLink=?;`, [activationLink]);
        if (!user[0]) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        await pool.query(`update activation set isActivated=? where activationLink=?;`, [1, activationLink]);
    }

    async login(email, password) {
        const [user] = await pool.query(`select * from user where email=?;`, [email]);
        if (!user[0]) {
            throw ApiError.BadRequest('Пользователь с таким email не был найден');
        }
        const isPasswordsEqual = await bcrypt.compare(password, user[0].password); // возвращает true/false - сравнение паролей
        if (!isPasswordsEqual) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        return generateAndSaveToken(user);
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const [user] = await pool.query(`select * from user where id=?;`, [userData.id]);
        return generateAndSaveToken(user);
    }

    async resetPassword(email) {
        const [user] = await pool.query(`select * from user where email=?`, [email]);
        if (!user[0]) {
            throw ApiError.EmailNotFound();
        }
        const activationLink = uuid.v4();
        await mailService.sendResetPassword(
            email,
            `${process.env.API_URL}/api/setNewPassword/${activationLink}?id=${user[0].id}`
        );
    }

    async newPassword(id, password) {
        const [user] = await pool.query('select * from user where id=?', [id]);
        if (!user[0]) {
            throw ApiError.UserNotFound();
        }
        const hashPassword = await bcrypt.hash(password, 3);
        await pool.query('update user set password=? where id=?', [hashPassword, id]);
        return user[0].email;
    }
}
module.exports = new userService();
