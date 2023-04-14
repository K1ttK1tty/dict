const jwt = require('jsonwebtoken')
const pool = require('../db').pool

class tokenService {
    generateTokens(payload) { // payload - информация о пользователе, но не пароль и не важные данные о нем
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SERCRET, { expiresIn: '30m' }) // генерация вебтокена
        // третим аргументом (их может быть несколько) время жизни
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) { // проверка токена на подделку и срок жизни
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SERCRET)
            return userData // вернется payload который вшит в токен
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData;
        } catch (err) {
            return null
        }
    }



    async saveToken(userId, refreshToken) { // сохранение refresh токена в базу
        const [refToken] = await pool.query(`select refreshToken from token where user_id=?;`, [userId])

        if (refToken[0]) { // перезапись токена если он уже существует
            await pool.query(`update token set refreshToken=? where user_id=?;`, [refreshToken, userId])
            return refreshToken
        }
  
        await pool.query(`insert into token (refreshToken,user_id) values(?,?);`, [refreshToken, userId]) // создание новoй записи 
        return refreshToken
    }

    async removeToken(refreshToken) {
        await pool.query(`delete from token where refreshToken=?`, [refreshToken])
        // возможно нужно что-то вернуть
    }

    async findToken(refreshToken) {
        const [token] = await pool.query(`select refreshToken from token where refreshToken=?`, [refreshToken]);
        return token[0].refreshToken;
    }

}
module.exports = new tokenService()