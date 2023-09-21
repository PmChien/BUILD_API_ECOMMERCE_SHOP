const product = require('../models/Product');
class productController {
    // Get
    index(req,res){
        res.send('day la chien')
    }
    // Create product
    async create(req,res){
        const productinit ={
            id: req.body.id,
            name : req.body.name,
            image : req.body.image
        }
        try {
            await product.create(bien)
            res.status(201).json({message :'created successfully'},productinit)
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new productController()