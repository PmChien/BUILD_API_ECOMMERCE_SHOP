const product = require('../models/Product');
const cate = require('../models/Categories');
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

// //
// const storage = multer.diskStorage({
//     destination : function (req, file,cb)
//     {
//         cb(null,'public/uploads')
//     },
//     filename : function (req,file,cb)
//     {
//         const fileName = file.originalname.replace(' ','-')
//         cb(null, fileName + '-' + Date.now())
//     }
// })
//     const upload = multer ({storage: storage})
class productController {
    // upload file image to server
    
    // Get all products and show count, and filter by category adn multi filter
    async index(req,res){
        let filter ={}
        if (req.query.categories){
            filter =   {category : req.query.categories.split(',')}
        }
        const countProduct = await product.countDocuments(filter)
        const product1 =await product.find(filter)
        if(!countProduct || !product1)
        {
            return res.status(404).message('Product not found')
        }
        try {
            res.json({
                total :countProduct,
                product1})
            
        } catch (error) {
            console.log(error)
            res.status(500).message('Error',error.message)
        }
    }
    // GET /products/feated show feated product and limit products
    async showFeaturedProduct (req,res,next)
    {
        try {
            const countFeaturedProduct = await product.countDocuments({isFeatured : true}).exec()
            const count = req.params.count  ? req.params.count : 0
            const featuredProduct = await product.find({isFeatured:true}).limit(+count).exec()
            res.status(200).json({
            Success :'true',
            Total:   count ? count :countFeaturedProduct,
            featuredProduct})
        } catch (error) {
            console.log(error)
            res.status(404).json({Message :'Error'})
        }
    }
    // GET /products/categories =ba382982,7382376 filter by category
    async filterByCategory(req,res){

    }
    // Create product
    async  create (req,res){
        uploadOptions.single('image')
        const category =await cate.findOne({_id : req.body.category})
        if(!category){
            return res.status(400).json({message : 'Ivalid Category'})
        }
            const fileName = req.file.fileName
            const basePath =` ${req.protocol}`
            const productInit = await product.create( {
                // id: req.body.id,
                name : req.body.name,
                description : req.body.description,
                richDescription : req.body.richDescription,
                image : fileName,
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