const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        color : {
            type : String,
            // required : true
        },
        icon : {
            type : String,
            // required : true
        },
        image : {
            type : String,
            required : true
        },
    }
)

module.exports = mongoose.model('Category', categoriesSchema)