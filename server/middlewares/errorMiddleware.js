const ApiError = require('../exeptions/apiError.js')
const fileError = require('../exeptions/fileError.js')
module.exports = function (err, req, res, next) {
    // первым параметром ошибка 
    console.log(err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    if (err instanceof fileError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}