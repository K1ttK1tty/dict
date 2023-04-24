const fileService = require('../service/fileService.js')
const path = require('path');
class fileController {

    async updateCards(req, res, next) {
        try {
            const { email, cards } = req.body
            await fileService.updateCards(email, cards)
            res.json({ "message": "" })
        } catch (err) {
            next(err)
        }
    }

    async updateThemes(req, res, next) {
        try {
            const { email, themes } = req.body
            await fileService.updateTheme(email, themes)
            res.json({ "message": "" })
        } catch (err) {
            next(err)
        }
    }


    async getContent(req, res, next) {
        try {
            const { email } = req.body
            const response = await fileService.getDataFromFile(email)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }


    async uploadAvatar(req, res, next) {
        try {
            const email = req.query.email
            const avatar = req.files.avatar
            const response = await fileService.uploadAvatar(email, avatar)
            // отправить 200

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
            next(err)
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