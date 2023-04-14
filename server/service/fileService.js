const fs = require('fs');
const path = require('path');
const fileError = require('../exeptions/fileError.js')

class fileService {

    async createUsersDataDir() {
        if (!fs.existsSync(process.env.USER_DATA_PATH)) {

            fs.mkdirSync(path.resolve(process.env.SERVER_DIR_PATH, 'usersData'))
        }
    }

    async createFile(email) {

        if (!fs.existsSync(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`))) {

            fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`), '', (err) => {
                if (err) {
                    throw new Error('Ошибка при создании файла')
                }
            })
        }
    }

    async getDataFromFile(email) {

        if (!fs.existsSync(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`))) {
            throw new Error('файла не существует')

        }
        let userData = fs.readFileSync(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`), { encoding: 'utf-8' }, (err, data) => { // прочитать содержимое файла
            if (err) {
                throw fileError.getDataError()
            }
        })

        return JSON.parse(userData)
    }


    async updateData(email,data) {
        const userData = JSON.stringify(data)

        if (!fs.existsSync(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`))) {
            throw fileError.ReadError()
            
        }

        fs.writeFile(path.resolve(process.env.USER_DATA_PATH, `${email}.txt`), userData, (err) => {
            if (err) {
                throw fileError.ReadError()
            }
        })
    }
 
}
module.exports = new fileService();