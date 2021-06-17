const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const user = require('../schemas/userschema');
const { User } = require('../database');
const express = require('express');
const router = express.Router();
var path =require('path');
const { check, validationResult } = require('express-validator');
  
 

 
router.post('/',
check('email','please enter a valid email').isEmail(),
check('password','please enter a password').exists(),
 async (req, res) => {
    // First Validate The HTTP Request
     const  error  = validationResult(req);
     if (!error.isEmpty()) {
        return res.status(400).json({ errors:error.array()});
    }
 
    //  Now find the user by their email address
    let users = await User.findOne({ email: req.body.email });
    if (!users) {
        return res.status(400).send('Incorrect email or password.');
    }
 
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    try{

        if(req.body.password == users.password){
            jwt.sign({users}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });
        }else{
        return res.status(400).send('Incorrect  password.');
    }
    
 
    console.log("done");

    }catch(err){
        console.log(err);
        res.status(500).send("server error");
    }

        

    
    res.sendFile(path.join(__dirname , '../frontpage.html'));

});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
 
    return schema.validate(req);
}
module.exports = router;

