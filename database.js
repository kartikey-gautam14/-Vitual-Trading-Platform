const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    favourites: [ String,
    ],
    Wallet: {
        type : Number,
        default : 5000,
    }, 
    BStock: [{
        symbol: {type: String},
        volume:{type: Number},
    }],   
        

    
}));
 
function validateUser(user) {
    const schema =Joi.object( {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    
   return schema.validate(user) ;
}
 
// exports.User = User;
// exports.validate = validateUser;