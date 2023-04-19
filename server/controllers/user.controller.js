const userService = require('../service/userService.js')
const { validationResult } = require('express-validator')
const ApiError = require('../exeptions/apiError.js')
const fileService = require('../service/fileService.js')

class userController {

    async registration(req, res, next) {

        try {
            const errors = validationResult(req) // тело достается автоматически и поля провалидируются 

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
                // передаем класс ошибки и вторым аргументом массив ошибок
            }

            const { userName, email, password } = req.body;
            const userData = await userService.registration(userName, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            // передаем куки, по ключу 'refreshToken' можно получить сам токен, далее параметры время жизни 
            // и httpOnly, чтобы нельзя было получить в браузере  
            // для https флаг secure=true
            // время жизни задается умножением цифр


            await fileService.createFile(email);

            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            // console.log(req.body)
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            const userContent = await fileService.getDataFromFile(email)

            return res.json({ ...userData, userContent })
        } catch (err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies; // вытаскиваем из куки токен
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token) // можно вернуть 200 статус
        } catch (err) {
            next(err)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (err) {
            next(err)
        }
    }

    async refresh(req, res, next) {
        try {

            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

}
module.exports = new userController()