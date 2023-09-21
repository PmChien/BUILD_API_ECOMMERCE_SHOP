const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes/product.route')
require('dotenv').config();
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))


const api = process.env.API_URL
// //connect db
mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log('connect db sucessfull!!')
})
.catch((err) =>{console.log(err)})



app.listen(port,()=>{
    console.log(`App listening on ${port}`)
    // console.log(api)
})
// routes
// router(app); 