const nodemailer = require('nodemailer');
class mailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на WordsWorld.',
            test: '',
            html: `
            <div>
                <h1>Активация аккаунта на WordsWorld</h1>
                <p>
                    Здравствуйте, для активации аккаунта вам необходимо перейти по <a href='${link}'>ссылке</a>,
                    ведущей обратно в приложение, активация произойдет автоматически
                 </p>
                 <p>Если вы получили эт​о сообщение по ошибке, то просто проигнорируйте его.</p>
            </div>
            `,
        });
    }

    async sendResetPassword(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Смена пароля на WordsWorld.',
            test: '',
            html: `
            <div>
                <h1>Смена пароля на WW.</h1>
                <p>
                    Здравствуйте, для смены пароля вам необходимо перейти по <a href='${link}'>ссылке</a> и ввести новый пароль. 
                    Смена пароля может занять некоторое время, просим проявить терпение. 
                </p>
                <p>Если вы получили эт​о сообщение по ошибке, то просто проигнорируйте его.</p>
            </div>
            `,
        });
    }
}
module.exports = new mailService();
