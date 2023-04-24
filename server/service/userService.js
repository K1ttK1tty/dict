const bcrypt = require('bcrypt')
const uuid = require('uuid')
const pool = require('../db.js').pool
const mailService = require('../service/mailService.js')
const tokenService = require('../service/tokenService.js')
const ApiError = require('../exeptions/apiError.js')

class userService {
    async registration(userName, email, password) {

        const [isPerson] = await pool.query(`select * from user where email=?;`, [email])
        if (isPerson[0]) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует.`)
        }
        const hashPassword = await bcrypt.hash(password, 3); // для хеширования пароля
        const activationLink = uuid.v4() // уникальная ссылка для активации по почте
        await pool.query(`insert into user (name,email,password) values(?,?,?);`, [userName, email, hashPassword]);

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`) 

        const [newPerson] = await pool.query(`select id,name,email from user where email=?;`, [email]) // запрос к только что добавленному пользователю
        await pool.query(`insert into activation (activationLink,user_id) values(?,?);`, [activationLink, newPerson[0].id])



        const tokens = tokenService.generateTokens(newPerson[0]) // тут возвращаются оба токена
        await tokenService.saveToken(newPerson[0].id, tokens.refreshToken) // тут refresh сохраняется в базу
        const dto = { ...newPerson[0], activationLink }

        return { ...tokens, user: dto } // можно две строчки вынести в отдельную функцию т.к. переиспользуется 2 раза
    }

    async activate(activationLink) {
        const [user] = await pool.query(`select * from activation where activationLink=?;`, [activationLink]);
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        await pool.query(`update activation set isActivated=? where activationLink=?;`, [1, activationLink])

    }

    async login(email, password) {
        const [user] = await pool.query(`select * from user where email=?;`, [email])
        if (!user[0]) { // если пользователя нет то ошибка
            throw ApiError.BadRequest('Пользователь с таким email не был найден')
        }
        const isPasswordsEqual = await bcrypt.compare(password, user[0].password) // возвращает true/false - сравнение паролей
        if (!isPasswordsEqual) { // если пароли не равный то ошибка
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = tokenService.generateTokens({ // генерация токенов
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            isActivated: user[0].isActivated
        })

        await tokenService.saveToken(user[0].id, tokens.refreshToken) // тут refresh сохраняется в базу

        return {
            ...tokens,
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                isActivated: user[0].isActivated
            }
        }
    }

    async logout(refreshToken) {

        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken) {


        // дублируется с логином -> вынести в отдельную функцию
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const [user] = await pool.query(`select * from user where id=?;`, [userData.id]) // действительно возвращается id
        const [userActivation] = await pool.query(`select * from activation where user_id=?;`, [userData.id]);
        const tokens = tokenService.generateTokens({
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            isActivated: userActivation[0].isActivated
        })

        await tokenService.saveToken(user[0].id, tokens.refreshToken) // тут refresh сохраняется в базу
        return {
            ...tokens,
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                isActivated: userActivation[0].isActivated
            }
        }
    }


    async resetPassword(email) {

        const [user] = await pool.query(`select * from user where email=?`, [email])
        // console.log(user[0].id)
        if (!user[0].email) {
            throw ApiError.EmailNotFound()
        }
        const activationLink = uuid.v4() // уникальная ссылка для активации по почте
        await mailService.sendResetPassword(email, `${process.env.API_URL}/api/setNewPassword/${activationLink}?id=${user[0].id}`)

    }


    async newPassword(id, password) {

        const [user] = await pool.query('select * from user where id=?', [id])

        if (!user[0].id) {
            throw ApiError.UserNotFound()
        }
        const hashPassword = await bcrypt.hash(password, 3); // для хеширования пароля
        await pool.query('update user set password=? where id=?', [hashPassword, id])

    }
}
module.exports = new userService();