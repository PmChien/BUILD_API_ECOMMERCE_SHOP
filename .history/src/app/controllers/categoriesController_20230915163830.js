const cate = require('../models/Categories')

class CategoryController 
{
    // get category
    async show(req,res){
        const category = await cate.find({})
        if (!category)
        {
            res.status(500).json({message: 'this category does not exist'})
        }
        res.status(200).json(category)
    }
    async create (req, res){
        res.send('created category')
    }
}
module.exports = new CategoryController