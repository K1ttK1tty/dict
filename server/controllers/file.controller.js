const fileService = require('../service/fileService.js')
class fileController {
    async getData(req, res, next) {
        try {
            const { email } = req.body
            const response = await fileService.getData(email)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
    async uploadData(req, res, next) {
        try {
            const { email, data } = req.body
            const response = await fileService.uploadData(email, data)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const email = req.query.email
            const avatar = req.files.avatar
            await fileService.uploadAvatar(email, avatar)
        } catch (err) {
            next(err)
        }
    }
    async getAvatar(req, res, next) {
        try {
            const email = req.body.data
            const response = await fileService.getAvatar(email)
            if (response) return res.download(response)
        } catch (err) {
        }
    }
    async removeAvatar(req, res, next) {
        try {
            const email = req.body.email
            await fileService.removeAvatar(email)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new fileController();