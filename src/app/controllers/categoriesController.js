const cate = require('../models/Categories')

class CategoryController 
{
    // show detail category /:id get
    async showdetail(req,res){
        const detailCategory = await cate.find({_id:req.params.id})
        try {
            if(!detailCategory){
            res.status(404).json({message: 'this category not found'})
            }
            res.status(200).json({message: 'find successfully',detailCategory})
        } catch (error) {
            console.log(error)
        }
    }
    // get allcategory
    async show(req,res){
        const category = await cate.find({})
        if (!category)
        {
            res.status(500).json({message: 'this category does not exist'})
        }
        res.status(200).json({category})
    }
    // POST create category /create
    async create (req, res){
        const newCategory = await cate.create({
            name : req.body.name,
            color : req.body.color,
            icon : req.body.icon,
            image : req.body.image,
        })
        if(!newCategory){ res.status(404).send('the category is not created')}
        res.status(201).json({Message :'Created',newCategory})
    }
    // Delete /delete/:id
    async deleteCategory (req, res) {
        const deletedCategory = await cate.deleteOne({_id : req.params.id})
        try {
            if(!deletedCategory){
            res.status(500).json({Message :'Cannot find category'})
            }
            res.status(200).json({Message :'Deleted'})
        } catch (error) {
            res.status(404).json({Message :'Can not Delete'})
            console.log(error)
        }
    }
    // PUT /update/:id update category
    async updateCategory(req, res){
        const id = req.params.id
        const bien = {
            name : req.body.name,
            color : req.body.color,
            icon : req.body.icon,
            image : req.body.image,
        }
        const newUpdate = await cate.findByIdAndUpdate(id,bien,{new :true})
        if(!newUpdate) {
            return res.status(500).send('Chưa update')
        }
        try {
            res.status(200).json({Message: 'Updated',newUpdate})
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new CategoryController