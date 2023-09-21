const User = require('../models/User')
const bcrypt = require('bcryptjs')
class Authentication{
    async login(req,res){
        try {
            const user = await User.findOne({email:req.body.email})
            if(!user){return res.status(404).json({Message : 'Email is not registered'})}
            const invalidPassword = bcrypt.compare(req.body.password, user.password)
            if(!invalidPassword){return res.status(404).json({Message :'Wrong password'})}
            
            res.status(200).json({Message : 'founded user', user})
        } catch (error) {
            console.log(error)
            res.status(404).json({Message : 'Error: ' + error.message})
        }

    }
    async register(req,res){}
}
module.exports = new Authentication()