const express = require('express');
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static(path.resolve(__dirname, '/data')))
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
router.post('/importUser', upload.single('file'), userController.importUsers)


router.get('/', userController.getAllUsers)
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router;