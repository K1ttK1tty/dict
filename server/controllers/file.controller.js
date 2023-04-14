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
}

module.exports = new fileController();