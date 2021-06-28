const express = require('express');
const router = express.Router();
const User = require('../schemas/userschema');
const Portfolio = require('../schemas/portfolio');


router.post("/",async (req,res)=>{

    var email = req.body.email;
    console.log(email);
    let user = await User.findOne({email:email});
    var id = user.id;
    var portfolio = await Portfolio.findOne({user:id});
    let data = {
        wallet:portfolio.Wallet
    };
    res.status(200).json(data);


})
module.exports = router;
