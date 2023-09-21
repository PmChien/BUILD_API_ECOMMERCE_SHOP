const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

function route(app){
    app.get('/product',productController.index)
    app.post('/product',productController.create)
}


module.exports = route