const fs = require('fs');
const path = require('path');
const fileError = require('../exeptions/fileError.js')
const tokenService = require('./tokenService.js')

class fileService {

    async createUsersDataDir() {
        if (!fs.existsSync(process.env.USER_DATA_PATH)) {

            fs.mkdirSync(path.resolve(process.env.SERVER_DIR_PATH, 'usersData'))
        }
    }

    async createFile(email) {

        fs.mkdir(path.resolve(process.env.SERVER_DIR_PATH, 'usersData', `${email}_content`), (err) => { // асинхронная функция
            if (err) {
                console.log(err)
                throw new Error('Ошибка при создании файла')
            }
        })
        fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `themes_${email}.txt`), '[]', (err) => {
            if (err) {
                console.log(err)
                throw new Error('Ошибка при создании файла')
            }
        })

        fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `cards_${email}.txt`), '[]', (err) => {
            if (err) {
                console.log(err)
                throw new Error('Ошибка при создании файла')
            }
        })

    }

    async getDataFromFile(email) {

        if (!fs.existsSync(path.resolve(process.env.USER_DATA_PATH, `${email}_content`))) {
            // throw new Error('файла не существует')
            throw fileError.getDataError()
        }
        let cards = fs.readFileSync(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `cards_${email}.txt`), { encoding: 'utf-8' }, (err, data) => { // прочитать содержимое файла
            if (err) {
                throw fileError.getDataError()
            }
        })
        let themes = fs.readFileSync(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `themes_${email}.txt`), { encoding: 'utf-8' }, (err, data) => { // прочитать содержимое файла
            if (err) {
                throw fileError.getDataError()
            }
        })
        const userCards = JSON.parse(cards)
        const userThemes = JSON.parse(themes)
        return { userCards, userThemes }
    }

 
    async updateCards(email, data) {
        const userData = JSON.stringify(data)

        if (!fs.existsSync(process.env.USER_DATA_PATH, `${email}_content`, `cards_${email}.txt`)) {
            throw fileError.ReadError()

        }

        fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `cards_${email}.txt`), userData, (err) => {
            if (err) {
                throw fileError.ReadError()
            }
        })
    }


    async updateTheme(email, data) {
        const userData = JSON.stringify(data)

        if (!fs.existsSync(process.env.USER_DATA_PATH, `${email}_content`, `themes_${email}.txt`)) {
            throw fileError.ReadError()

        }

        fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `themes_${email}.txt`), userData, (err) => {
            if (err) {
                throw fileError.ReadError()
            }
        })
    }

}
module.exports = new fileService();