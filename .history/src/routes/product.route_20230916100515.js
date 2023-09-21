const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

router.put('/update/:id',productController.update1Product)
router.get('/featured/:count',productController.test)
router.get('/featured',productController.showFeaturedProduct)
router.get('/:id',productController.showDetails)
router.delete('/delete/:id',productController.deleteProduct)
router.get('/',productController.index)
router.post('/',productController.create)


module.exports = router