const cate = require('../models/Categories')

class CategoryController 
{
    // get category
    async show(req,res){
        res.send('show all categories')
    }
    async create (req, res){
        res.send('created category')
    }
}
module.exports = new CategoryController