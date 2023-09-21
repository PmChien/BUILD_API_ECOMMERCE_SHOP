const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../app/controllers/userController')


router.post('/',userController.createUser)
router.get('/',userController.getAllUsers)



module.exports = router