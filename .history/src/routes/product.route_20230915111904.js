const express = require('express');
const app = express();
const router = express.Router();


function route(app){
    app.get('/',(req, res) =>{
        res.send('chien day')
    })

}


module.exports = route