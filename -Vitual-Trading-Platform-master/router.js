const { User, validate } = require('./trash2');
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
       
        await user.save();
        console.log(user)
        res.sendFile(path.join(__dirname, '../gareebo ke buffet_2', 'login.html'));

    }
});
 
module.exports = router;