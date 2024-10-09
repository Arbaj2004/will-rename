const express = require('express');
const resourcesController = require('../controllers/resourcesController')

const router = express.Router();

router.post('/resources', resourcesController.createResources)


module.exports = router;