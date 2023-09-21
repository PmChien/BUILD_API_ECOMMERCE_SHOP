const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderItems : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'OrderItem',
            required : true
        }],
    }
)

module.exports = mongoose.model('order', orderSchema)