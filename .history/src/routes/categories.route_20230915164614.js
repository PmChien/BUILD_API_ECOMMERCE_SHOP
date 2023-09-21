const express = require('express');
const app = express();
const router = express.Router();
const Category = require('../app/controllers/categoriesController')


router.get('/',Category.show)
router.post('/',Category.create)
router.delete('/delete/:id',Category.delete)

module.exports = router