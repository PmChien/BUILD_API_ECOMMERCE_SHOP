const express = require('express');
const app = express();
const router = express.Router();
const orderController = require('../app/controllers/ordersController')


// router.get('/',productController.index)
router.post('/',orderController.create)


module.exports = router