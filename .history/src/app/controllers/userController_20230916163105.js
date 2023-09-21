const User = require('../models/User')
const bcrypt = require('bcryptjs')
require('dotenv').config()
class userController{
    async createUser(req,res){
        try {
            const newUser = await User.create({
                name : req.body.name,
                email : req.body.email,
                passWordHash : bcrypt.hashSync(req.body.password,10),
                phone : req.body.phone, 
                isAdmin : req.body.isAdmin,
                street : req.body.street,
                apartment : req.body.apartment,
                zip : req.body.zip,
                city : req.body.city,
                country : req.body.country,
            })
            if(!newUser) { res.status(404).json({message:'Can not create'})}
            res.status(201).json({message:'Success created', newUser})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error creating',error})
        }
    }
}

module.exports = new userController()