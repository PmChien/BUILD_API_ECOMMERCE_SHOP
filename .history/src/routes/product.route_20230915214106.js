const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

router.get('/:id',productController.showDetails)
router.get('/',productController.index)
router.post('/',productController.create)
router.put('/update/:id',productController.updateProduct)


module.exports = router