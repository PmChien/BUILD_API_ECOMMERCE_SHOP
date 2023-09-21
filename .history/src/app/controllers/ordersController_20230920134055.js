const order = require('../models/Order');
const OrderItems = require('../models/Order-item');
const mongoose = require('mongoose');

class orderController{

    // POST create order /orders
    async create(req,res){
        try {
            const orderItemsIds = Promise.all(
                req.body.orderItems.map(async orderItem =>{
                    let newOrderItem = await OrderItems.create({
                        quantity : orderItem.quantity,
                        product : orderItem.product,
                    })
                    return newOrderItem._id
                })
            )
            const result = await orderItemsIds
            
            const totalPrices = Promise.all(result.map(async(idOrderItem) =>{
                const orderItem = await OrderItems.findById(idOrderItem).populate('product','price')
                const totalPrice = orderItem.product.price * orderItem.quantity
                return totalPrice
            }))
            const totalPrice = (await totalPrices).reduce((a,b) => a + b ,0)
            const newOrder = await order.create({
                orderItems : result,
                shippingAddress1 : req.body.shippingAddress1,
                shippingAddress2 : req.body.shippingAddress2,
                city : req.body.city,
                zip : req.body.zip,
                country : req.body.country,
                phone : req.body.phone,
                status : req.body.status,
                totalPrice : totalPrice,
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
        .populate({ path :'orderItems', populate : 'product' })
        if (!detailOrder) { return res.status(404).json({Message : 'The order cannot found!'}) }
        try {
            res.status(200).json({Message : 'the order founded', detailOrder})
        } catch (error) {
            res.status(400).json({Message : error.message})
        }
    }
    // PUT update status order /orders/:id
    async updateStatusOrder(req,res){
        const newStatus = await order.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },{new :true})
        if (!newStatus) { return res.status(404).json({Message : 'Can not update status'}) }
        try {
            res.status(200).json({Message : 'Update success', newStatus})
        } catch (error) {
            res.status(400).json({Message : error.message})
        }
    }
    // DELETE  order /orders/:id
    async deleteOrder(req,res){
        await order.findByIdAndDelete(req.params.id)
        .then(async(deletedOrder) =>{
            if(deletedOrder){
                await Promise.all(
                    deletedOrder.orderItems.map(async(idItem) => {
                        await OrderItems.findByIdAndDelete(idItem)
                    })
                    )
            }
            else{
                return res.status(400).json({Success :'false',Message : 'Cannot delete order'})
            }
            return res.status(200).json({Success :'true',Message : 'Delete Success'})
        })
        .catch(error => res.status(500).json({Success :'false',Message : 'Error deleting order',error}))
        
    }
    // GET  get /totalsales
    // async getTotalSales(req,res){
    //     const totalSales = await order.aggregate([
    //         { $group :  {_id : null, totalSales : { $sum : 'totalPrice'}}}
    //     ])
    //     if (!totalSales) {return res.status(400).json({ Message : 'Error getting total'})
    // }
    //     res.status(200).json({totalSale : totalSales})

    // }
    async getTotalSales(req, res) {
        try {
          const totalSales = await order.aggregate([
            {
              $group: {
                _id: null,
                totalSales: { $sum: '$totalPrice' } // Use $ to reference the field
              }
            }
          ]);
      
          if (!totalSales || totalSales.length === 0) {
            return res.status(400).json({ Message: 'Error getting total' });
          }
      
          res.status(200).json({ totalSale: totalSales[0].totalSales }); // Access the totalSales value from the first result
        } catch (error) {
          console.error(error);
          res.status(500).json({ Message: 'Internal Server Error' });
        }
      }
      
}
module.exports = new orderController()