const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret =process.env.JWT_SECRET
const bcrypt = require('bcryptjs')
const salt = process.env.hash_key
require('dotenv').config()
class Authentication{
    async login(req,res){
        try {
            const user = await User.findOne({email:req.body.email})
            if(!user){return res.status(404).json({Message : 'Email is not registered'})}
            const validPassword = bcrypt.compare(req.body.password, user.passWordHash)
            if(!validPassword){return res.status(404).json({Message :'Wrong password'})}
            if(user && validPassword){
                const token = jwt.sign({
                    userId : user.id,
                    email : user.email,
                },jwtSecret,{ expiresIn : '4w'})
                res.status(200).json({Message : 'founded user', user : user.email,token})
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({Message : 'Error: ' + error.message})
        }

    }
    async register(req,res){
        try{
            const newUser = await User.create({
                email : req.body.email,
                passWordHash : bcrypt.hashSync(req.body.password,salt),
            })
            if(!newUser) { res.status(404).json({message:'Can not create'})}
                res.status(201).json({message:'Success created', newUser})
        }
        catch (error) {
            console.log(error)
            res.status(500).json({message:'Error creating',error})
        }
    }
}
module.exports = new Authentication()