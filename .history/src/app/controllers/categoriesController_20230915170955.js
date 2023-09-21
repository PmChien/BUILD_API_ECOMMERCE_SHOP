const cate = require('../models/Categories')

class CategoryController 
{
    // show detail category /:id get
    async showdetail(req,res){
        
    }
    // get category
    async show(req,res){
        const category = await cate.find({})
        if (!category)
        {
            res.status(500).json({message: 'this category does not exist'})
        }
        res.status(200).json({category})
    }
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
}
module.exports = new CategoryController