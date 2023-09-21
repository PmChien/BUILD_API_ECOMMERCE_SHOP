const express = require('express');
const app = express();
const router = express.Router();
const Category = require('../app/controllers/categoriesController')

router.put('/update/:id',Category.updateCategory)
router.get('/:id',Category.showdetail)
router.delete('/delete/:id',Category.deleteCategory)
router.get('/',Category.show)
router.post('/',Category.create)

module.exports = router