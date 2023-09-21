const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

function route(app){
    app.get('/',productController.index)

}


module.exports = route