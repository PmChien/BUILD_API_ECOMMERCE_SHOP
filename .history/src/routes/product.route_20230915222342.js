const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

router.get('/:id',productController.showDetails)
router.put('/update/:id',productController.updateProduct)
router.get('/',productController.index)
router.post('/',productController.create)


module.exports = router