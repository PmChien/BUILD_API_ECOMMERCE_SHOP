const product = require('../models/Product');
const cate = require('../models/Categories');
class productController {
    // Get all products
    async index(req,res){
        const product1 =await product.find({})
        res.json({product1})
    }
    // Create product
    async create(req,res){
        const category =await cate.findOne({_id : req.params.category})
        if(!category){
            return res.status(400).json({message : 'Ivalid Category'})
        }
            const productInit ={
                // id: req.body.id,
                name : req.body.name,
                description : req.body.description,
                richDescription : req.body.richDescription,
                image : req.body.image,
                images : req.body.images,
                brand : req.body.brand,
                price : req.body.price,
                category : req.body.category,
                countInStock : req.body.countInStock,
                rating : req.body.rating,
                numReviews : req.body.numReviews,
                isFeatured : req.body.isFeatured,
                dateCreated : req.body.dateCreated,
            }
        try {
            await product.create(productInit)
            res.status(201).json({message :'created successfully',productInit})
        } catch (error) {
            res.status(404).json({message :'created failed',error})
            console.log(error)
        }
    }
}

module.exports = new productController()