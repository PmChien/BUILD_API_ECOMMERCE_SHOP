const product = require('../models/Product');
class productController {
    // Get all products
    async index(req,res){
        const product1 =await product.find({})
        res.json({product1})
    }
    // Create product
    async create(req,res){
        const productinit ={
            // id: req.body.id,
            name : req.body.name,
            image : req.body.image,
            countInStock : req.body.countInStock,
        }
        try {
            await product.create(productinit)
            res.status(201).json({message :'created successfully',productinit})
        } catch (error) {
            res.status(404).json({message :'created failed',error})
            console.log(error)
        }
    }
}

module.exports = new productController()