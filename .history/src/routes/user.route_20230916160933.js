const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../app/controllers/userController')


router.post('/create',userController.createUser)
// router.get('/',userController.index)



module.exports = router