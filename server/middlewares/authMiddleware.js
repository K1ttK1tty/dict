const ApiError = require('../exeptions/apiError.js')
// для того чтобы фукнция getAllUsers была доступна только авторизованный пользователям
const tokenService = require('../service/tokenService.js')
module.exports = function (req, res, next) {

    try {
        const authorizationHeader = req.headers.authorization; // получение токена в заголовке 
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]; // разбиение строки "Bearer 'token'", получаем из header в запросе
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next();

    } catch (err) {
        return next(ApiError.UnauthorizedError())
    }
    
}