const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const adminController = require('../controllers/adminController');

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
router.post('/importUser', upload.single('file'), adminController.importEvents)



router.get('/events', adminController.getAllEvents)
router.post('/events', adminController.addAnEvent)




module.exports = router;