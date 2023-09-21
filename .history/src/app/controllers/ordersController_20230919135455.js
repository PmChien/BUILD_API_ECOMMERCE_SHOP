const order = require('../models/Order');
const orderItems = require('../models/Order-item');
const mongoose = require('mongoose');

class orderController{

    // POST create order /orders
    async create(req,res){
        try {
            const orderItemsIds = Promise.all(
                req.body.orderItems.map(async orderItem =>{
                    let newOrderItem = await orderItems.create({
                        quantity : orderItem.quantity,
                        product : orderItem.product,
                    })
                    return newOrderItem._id
                })
            )
            const result = await orderItemsIds
            const newOrder = await order.create({
                orderItems : result,
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
            res.status(201).json({Message : 'the order was created successfully', newOrder})
        } catch (error) {
            console.log(error)
            res.status(400).json({Message : error.message})
        }
    }
    // GET showall order /orders
    async index(req,res){
        const showAllOrder = await order.find({}).populate('user', 'name')
        .sort({'dateOrdered': -1}) //sort by new date order
        if(!showAllOrder) { return res.status(404).json({Message : 'The order cannot found!'}) }
        try {
            res.status(200).json({Message : 'the order founded', showAllOrder})
        } catch (error) {
            res.status(400).json({Message : error.message})
        }
    }
    // GET detail order /orders/:id
    async getDetailOrder(req,res){
        const detailOrder = await order.findById(req.params.id)
        .populate('orderItem')
        if (!detailOrder) { return res.status(404).json({Message : 'The order cannot found!'}) }
        try {
            res.status(200).json({Message : 'the order founded', detailOrder})
        } catch (error) {
            res.status(400).json({Message : error.message})
        }
    }
}
module.exports = new orderController()