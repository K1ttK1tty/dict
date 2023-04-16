const fileService = require('../service/fileService.js')

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



}

module.exports = new fileController();