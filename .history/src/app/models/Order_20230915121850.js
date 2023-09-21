const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name : {type : String},
        image : {type : String},
        countInStock : {type : Number, required: true},
    }
)

module.exports = mongoose.model('product', productSchema)