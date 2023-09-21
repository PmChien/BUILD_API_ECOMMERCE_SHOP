const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')


router.get('/',productController.index)
router.post('/',productController.create)


module.exports = route