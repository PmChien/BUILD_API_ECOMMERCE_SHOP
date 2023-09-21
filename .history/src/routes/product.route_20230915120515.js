const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')
require('dotenv').config();

const api = process.env.API_URL
function route(app){
    app.get(`${api}/product`,productController.index)
    app.post(`${api}/product`,productController.create)
}


module.exports = route