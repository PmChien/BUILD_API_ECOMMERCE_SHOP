const order = require('../models/Order');
const orderItems = require('../models/Order-item');
const mongoose = require('mongoose');

class orderController{

    // POST create order
    async create(req,res){
        try {
            const orderItemsIds = req.body.orderItems.map(async orderItem =>{
                let newOrderItem = await orderItems.create({
                    quantity : orderItem.quantity,
                    product : orderItem.product,
                })
                return newOrderItem._id
            })
            const newOrder = await order.create({
                orderItems : orderItemsIds,
                shippingAddress1 : req.body.shippingAddress1,
                shippingAddress2 : req.body.shippingAddress2,
                city : req.body.city,
                zip : req.body.zip,
                country : req.body.country,
                phone : req.body.phone,
                status : req.body.status,
                totalPrice : req.body.totalPrice,
                user : req.body.user,
                dateOrdered : req.body.dateOrdered,
            })
            if(!newOrder) { return res.status(404).json({Message : 'the new order can not created'}) }
            res.status(200).json({Message : 'the order was created successfully', newOrder})
        } catch (error) {
            console.log(error)
            res.status(400).json({Message : error.message})
        }
    }
}
module.exports = new orderController()