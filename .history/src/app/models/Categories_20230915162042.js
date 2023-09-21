const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
    {
        name : {type : String},
        image : {type : String},
        countInStock : {type : Number, required: true},
    }
)

module.exports = mongoose.model('Category', categoriesSchema)