# Dictionary app
This application will help you to learn foreign language. You can store words or sentences, mark it by colors and quickly find in future. Also there is a self-check by word/translate, and finally you can view your progress over time.
# How to run
##### The `/server` directory contains the server application, and a `/Front` directory contains the web app.
#####  `/server/database.sql` file contains DB tables that you should create
Inside the `/server` folder create `.env` file and write following:
```
PORT = <YOUR-PORT>
SERVER_DIR_PATH = <'Path to /server'>
USER_DATA_PATH = <'Path to /server/userData'>
API_URL = 'http://localhost:5001' // Your server url

JWT_ACCESS_SERCRET = <'jwt-secret-key'> // any string
JWT_REFRESH_SECRET = <'jwt-refresh-secret-key'> // any string

CLIENT_URL =  'http://localhost:5173' // Browser url
CHANGE_PASSWD_URL = 'http://localhost:5173/setNewPassword'
 // if you use gmail you need turn on IMAP protocol in your account settings
SMTP_HOST = <'YOUR-HOST'> // <'SMTP.mail.ru'> for email or <'smtp.gmail.com'> for google
SMTP_PORT = <MAIL-PORT> // <465> for mail.ru or <587> for gmail
SMTP_USER = <'EMAIL'>
SMTP_PASSWORD = <'EMAIL-PASSWORD'>

DB_DATABASE = <'DB-NAME'> // I user mySql
DB_PASSWORD = <'DB-PASSWORD'>
DB_USER = <'DB-USER'>
DB_HOST = <'DB-HOST'> // I used '127.0.0.1'
```
Then run the following commands in `/server` and `/client` directories:
```
npm install
npm run dev
```

Application should run at http://localhost:5173
