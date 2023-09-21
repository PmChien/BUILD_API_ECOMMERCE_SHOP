const express = require('express');
const app = express();
const router = express.Router();


function router(app){
    app.get('/',(req, res) =>{
        res.send('hi')
    })

}


module.exports = router