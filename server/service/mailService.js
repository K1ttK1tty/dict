const nodemailer = require('nodemailer')
// require('dotenv').config()
class mailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

    }
 
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            test: '',
            html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href='${link}'>${link}</a>
            </div>
            `
        })
    }


    async sendResetPassword(to,link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Смена пароля на ' + process.env.API_URL,
            test: '',
            html: `
            <div>
                <h1>Для смены пароля перейдите по ссылке, далее вам нужно будет ввести новый пароль</h1>
                <p>Если вы получили это письмо по ошибке, то просто проигнорируйте его.</p>
                <a href='${link}'>${link}</a>
            </div>
            `
        })
    }

}
module.exports = new mailService()