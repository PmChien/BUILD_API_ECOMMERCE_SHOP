const User = require('../models/User')

class userController{
    async createUser(req,res){
        const newUser = await User.create({
            name : req.body.name,
            image : req.body.image,
            passWordHash : req.body.passWordHash,
            phone : req.body.phone,
            isAdmin : req.body.isAdmin,
            street : req.body.street,
            apartment : req.body.apartment,
            zip : req.body.zip,
            city : req.body.city,
            country : req.body.country,
        })
    }
        
    
}

module.exports = new userController()