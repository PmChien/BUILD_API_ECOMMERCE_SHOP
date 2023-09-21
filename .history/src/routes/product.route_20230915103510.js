const express = require('express');
const app = express();
const router = express.Router();


function router(app){
    router.get('/',(req, res) =>{
        res.send('hi')
    })

}


module.exports = router