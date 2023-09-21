const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../app/controllers/userController')


router.post('/',userController.createUser)
router.get('/member',userController.getMember)
router.get('/:id',userController.getSingleUsers)
router.get('/',userController.getAllUsers)
router.put('/setAdmin/:id',userController.setAdmin)



module.exports = router