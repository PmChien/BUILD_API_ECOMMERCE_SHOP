const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const upload = multer ({storage: storage})
const orderController = require('../app/controllers/ordersController')

router.get('/get/totalSales',orderController.getTotalSales)
router.get('/get/countUserOrders/:userId',orderController.countUserOrders)
router.get('/get/count',orderController.countOrders)
router.put('/:id',orderController.updateStatusOrder)
router.get('/:id',orderController.getDetailOrder)
router.delete('/:id',orderController.deleteOrder)
router.get('/',orderController.index)
router.post('/',orderController.create)

module.exports = router