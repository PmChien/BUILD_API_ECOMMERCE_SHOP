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
        const category =await cate.findOne({_id : req.body.category})
        if(!category){
            return res.status(400).json({message : 'Ivalid Category'})
        }
            const productInit = await product.create( {
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
            })
        try {
            res.status(201).json({message :'created successfully',productInit})
        } catch (error) {
            res.status(404).json({message :'created failed',error})
            console.log(error)
        }
    }
    // Get one product Get /products/:id
    async showDetails(req,res){
        const details = await product.findOne({_id:req.params.id}).populate('category')
        if(!details) {return res.status(404).json({message: 'Product not found'})}
        try {
            res.status(200).json({message: 'Product found',details})
        } catch (error) {
            res.status(500).json({message: 'Product not found'})
            console.log(error)
        }
    }
    // Put PUT /products/update/:id update product
    async update1Product(req,res){
        const productUpdated = 
        {
            name: req.body.name,
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
        }
        const id = req.params.id
        const newProduct = await product.findByIdAndUpdate(id,productUpdated,{new :true})
        if(!newProduct){return res.status(500).send('Cannot update product')}
        try{
            res.status(201).json({Message : "Product updated successfully",newProduct})
        } catch (error) {
            res.status(400).json({Message : "Error updating product"}, error)
            console.log(error)
        }
    }
}

module.exports = new productController()