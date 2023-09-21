const express = require('express');
const app = express();
const router = express.Router();
const orderController = require('../app/controllers/ordersController')


router.put('/:id',orderController.updateStatusOrder)
router.get('/:id',orderController.getDetailOrder)
router.get('/',orderController.index)
router.post('/',orderController.create)

module.exports = router