const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name : {type : String, required: true},
        image : {type : String, required: true},
        passWordHash : {type : String, required: true},
        phone:{type : String,required: true},
        isAdmin : {type : boolean, default: false},
        street : {type : String, default :''},
        apartment: {type : String, default :''},
        zip : {type : String, default :''},
        city : {type : String, default :''},
        country : {type : String, default :''},
    }
)
    userSchema.virtual('id').get(function(){
        return this._id.toHexString();
    })
    userSchema.set('toJSON',{virtuals:true})

module.exports = mongoose.model('user', userSchema)