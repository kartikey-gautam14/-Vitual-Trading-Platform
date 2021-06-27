const express = require('express');
const router = express.Router();
const User = require('../schemas/userschema');
const Portfolio = require('../schemas/portfolio')

router.post("/",async (req,res)=>{
    var email = req.body.email;
    console.log(email);
    var user =await User.findOne({email:email});
    var id = user.id;
    var portfolio = await Portfolio.findOne({user:id});
    var data = [];
    portfolio.favouritestocks.forEach(function(object){
      data.push(object
       
      );
    });
    res.json(data);




})
module.exports = router;