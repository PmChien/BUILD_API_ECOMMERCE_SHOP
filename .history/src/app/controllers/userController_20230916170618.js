const User = require('../models/User')
const bcrypt = require('bcryptjs')
require('dotenv').config()
class userController{
    // POST / create a new user
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
    // GET / get all users
    async getAllUsers(req,res) {
        try {
            const countUsers = await User.countDocuments({})
            const getAllUsers =  await User.find({}).select('-passWordHash')
            if (!getAllUsers) { return res.status(404).json({message: 'User not found'})}
            res.status(200).json({ Message :'Founded user',total : countUsers,getAllUsers })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error',error})
        }
    }
    async getSingleUsers(req,res) {
        try {
            const getUsers =  await User.findOne({_id : req.params.id}).select('-passWordHash')
            // const getUsers =  await User.findOne({_id : req.params.id}).select('name phone email') only name phone and email
            if (!getUsers) { return res.status(404).json({message: 'User not found'})}
            res.status(200).json({ Message :'Founded user',getUsers})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error',error})
        }
    }
    
}

module.exports = new userController()