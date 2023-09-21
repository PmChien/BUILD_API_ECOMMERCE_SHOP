const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name : {type : String},
        image : {type : String},
        countInStock : {type : Number, required: true},
    }
)

module.exports = mongoose.model('user', userSchema)