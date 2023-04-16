const ApiError = require('../exeptions/apiError.js')
const fileError = require('../exeptions/fileError.js')
module.exports = function (err, req, res, next) {
    // первым параметром ошибка 

    if (err instanceof ApiError) {
        return next(res.status(err.status).json({ message: err.message, errors: err.errors }));
    }

    if (err instanceof fileError) {
        return next(res.status(500).json({ message: err.message, errors: err.errors }));
    }
    next();
    return res.status(500).json({ message: 'Непредвиденная ошибка' })
} 