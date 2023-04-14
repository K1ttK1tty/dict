// router
const Router = require('express').Router;
const router = new Router();
// controllers
const userController = require('../controllers/user.controller.js')
const fileController = require('../controllers/file.controller.js')
// other
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware.js') // еще одна "валидация" токена


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
// work with files
router.post('/update', authMiddleware, fileController.updateContent);
router.post('/getData', authMiddleware, fileController.getContent)


module.exports = router