const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        quantity: {
        type : Number,
        required: true
    },
        product :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product'
        }
},

)

module.exports = mongoose.model('orderItem', orderItemSchema)