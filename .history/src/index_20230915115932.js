const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes/product.route')
const app = express()
require('dotenv').config();
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))


// const api = process.env.API_URL
//connect db
mongoose.connect(process.env.MONGODB_URI,{
        newUrlParser : true,
        useUnifiedTopology : true,
        dbName : 'eShopDB'}
    .then(() =>{
        console.log('connect db sucessfull!!')
    })
    .catch((err) =>{console.log(err)})
    )
// routes
router(app)

app.listen(port,()=>{
    console.log(`App listening on ${port}`)
    
})
