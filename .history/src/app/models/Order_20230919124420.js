const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderItems : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'OrderItem',
            required : true
        }],
        shippingAddress1 :{
            type : String,
            required : true
        },
        shippingAddress2 :{
            type : String,
        },
        city :{
            type : String,
            required : true
        },
        zip :{
            type : String,
            required : true
        },
        country :{
            type : String,
            required : true
        },
        phone :{
            type : String,
            required : true
        },
        status :{
            type : String,
            required : true,
            default : 'Pending'
        },
        totalPrice :{
            type : Number,
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        dateOrdered : {
            type : Date,
            default : Date.now,
        }
    }
)
// create virtual id
orderSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
orderSchema.set('toJSON',{virtuals :true})


module.exports = mongoose.model('order', orderSchema)