// const { User, validate } = require('../database');
const jwt = require('jsonwebtoken');

const User  = require('../schemas/userschema')
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
var {check,validationResult} = require('express-validator');
const portfolio = require('../schemas/portfolio');
 
router.post('/', check('email','please enter a valid email').isEmail(),
check('password','please enter a password').exists(),
check('name','please enter your name').exists(),
async (req, res) => {
    // First Validate The Request
    const  error  = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors:error.array()});
    }
 
    // Check if this user already exisits
    let users = await User.findOne({ email: req.body.email });
    if (users) {
        console.log(users);
        return res.status(400).send('That user already exisits!');
    } else {
        try{
            
            users = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            var portfoli = new portfolio({
                user:users,
             });
           
            await users.save();
            await portfoli.save();
           
            
            console.log(users);
            console.log(portfoli);
            jwt.sign({users}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });
           
        }catch(err){
            console.log(err);
            res.status(500).send("server error");
        }
      

    }
});
 
module.exports = router;