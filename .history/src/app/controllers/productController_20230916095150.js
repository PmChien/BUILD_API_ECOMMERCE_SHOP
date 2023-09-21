const product = require('../models/Product');
const cate = require('../models/Categories');
const mongoose = require('mongoose');
class productController {
    // Get all products and show count
    async index(req,res){
        try {
            const countProduct = await product.countDocuments({})
            const product1 =await product.find({})
            if(!countProduct || !product1)
            {
                return res.status(404).message('Product not found')
            }
            res.json({
                total :countProduct,
                product1})
            
        } catch (error) {
            console.log(error)
            res.status(500).message('Error',error.message)
        }
    }
    // GET /products/feated show feated product
    async showFeaturedProduct (req,res,next)
    {
        try {
            const countFeaturedProduct = await product.countDocuments({isFeatured : true}).exec()
            const count = req.params.count  ? req.params.count : 0
            console.log(count)
            // if(count)
            // {
            //     const featuredProduct = await product.find({isFeatured:true}).limit(+count).exec()
            //     res.status(200).json({Success :'true',
            //     Total:  countFeaturedProduct,
            //     featuredProduct})
                
            // }
            // else{
            //     const featuredProduct = await product.find({isFeatured:true}).exec()
            //     if((featuredProduct.length === 0))
            //     {
            //         return res.status(404).json({Message :'Error'})
            //     }
            //     res.status(200).json({Success :'true',
            //     Total:  countFeaturedProduct,
            //     featuredProduct})
            //     next()
            // }
            // .limit(+count)
            // res.status(200).json({Success :'true',
            // Total:  countFeaturedProduct,
            // featuredProduct})
        // } catch (error) {
        //     console.log(error)
        //     res.status(404).json({Message :'Error'})
        // }
    }
    test(req,res)
    {
        const count = req.params.bien 
        if(!count)
        {

        }
        res.status(200).json({Message: 'OK',count})
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
      // DELETE  /products/delete/:id delete product
      async deleteProduct(req, res) {
        // check mongoose objectId
        const isValidMongooseId = mongoose.isValidObjectId(req.params.id)
        if(isValidMongooseId == false)
        {
            return res.status(404).json({message: "Invalid ObjId"});
        }
        const ExistId = await product.findById(req.params.id)
        if (!ExistId) {
            return res.status(404).json({message: 'Invalid Product ID'})
        }
        const deletedProduct = await product.deleteOne({_id: req.params.id})
        if (!deletedProduct)
        {
            return res.status(500).json({Message : "Error deleting product"}, error)
        }
        try {
            res.status(200).json({Message : "Deleted"})
        } catch (error) {
            console.log(error)
            res.status(404).json({Message : "Error deleting product"}, error)
        }
      }
}

module.exports = new productController()