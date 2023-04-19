const express = require('express');
const fileupload = require('express-fileupload')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const router = require('./router/router.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')
const fileService = require('./service/fileService.js')
const PORT = process.env.PORT || 5001;
const app = express()

app.use(fileupload({}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware) // всегда в конце  


const pool = require('./db.js').pool

const getData = async () => {
    // const [rows] = await pool.query(`select * from user where id=?;`, [26])
    // const [users] = await pool.query(`select * from user;`)

    // console.log(users) 
    // const nev = result[0][0]

    // console.log(rows[0])
    // console.log({
    //     id: rows[0].id,
    //     email: rows[0].email,
    //     isActivated: rows[0].isActivated
    // })
}
const fs = require('fs');
const path = require('path')

// fs.mkdirSync(path.resolve(process.env.USER_DATA_PATH, `vlad.petuxov.2018@bk.ru.txt`), (err) => {
//     if (!err) {
//         console.log("ошибка создания папки")
//     }
// })

// path.resolve(process.env.USER_DATA_PATH, `${email}_content`,
// if (fs.existsSync(path.resolve(process.env.USER_DATA_PATH, `vlad.petuxov.2018@bk.ru_content`,'avatar.jpeg'))) {
//     console.log("файл существует")
// }
 
// fs.readFile(path.resolve(process.env.USER_DATA_PATH, `vlad.petuxov.2018@bk.ru.txt`), { encoding: 'utf-8' }, (err, data) => { // прочитать содержимое файла
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log(JSON.parse(data))
// })

const start = () => {
    try {
        app.listen(PORT, () => console.log('server start at port ' + PORT))
        fileService.createUsersDataDir();

    } catch (err) {
        console.log(err)
    }
}

start()
getData()