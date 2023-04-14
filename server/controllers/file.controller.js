const fileService = require('../service/fileService.js')

class fileController {

    async updateContent(req, res, next) {
        try {
            const { email, data } = req.body
            await fileService.updateData(email, data)
            res.json({
                "message": "",
                "errors": []
            })
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