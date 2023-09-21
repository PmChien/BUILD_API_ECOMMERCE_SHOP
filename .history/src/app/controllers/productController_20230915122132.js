const product = require('../models/Product');
class productController {
    // Get
    index(req,res){
        res.send('day la chien')
    }
    // Create product
    async create(req,res){
        const productinit ={
            // id: req.body.id,
            name : req.body.name,
            image : req.body.image,
            CountInStock : req.body.CountInStock,
        }
        try {
            await product.create(productinit)
            res.status(201).json({message :'created successfully',productinit})
        } catch (error) {
            res.status(404).json({message :'created failed',error.message})
            console.log(error)
        }
    }
}

module.exports = new productController()