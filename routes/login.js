const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../database');
const express = require('express');
const router = express.Router();
var path =require('path');
var Email;
  
 

 
router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
 
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    

    if(req.body.password==user.password)
    //const validPassword = await bcrypt.compare(req.body.password, user.password);
    {
        return res.status(400).send('Incorrect  password.');
    }
 
    console.log("done");
    

    
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2', 'stock.html'));

});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
 
    return schema.validate(req);
}
module.exports = router;

