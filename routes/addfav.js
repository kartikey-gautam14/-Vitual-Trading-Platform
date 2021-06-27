
const User = require('../schemas/userschema');
const user = require('../schemas/portfolio')
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');




router.post("/",async function(req,res){
  var symbol =req.body.company
    var Email=req.body.Email;
    
   var get_id =await User.findOne({email:Email});
    var id = get_id.id;
    console.log(id);

  //  var stock_exists =  user.findOne({favouritestocks : {stockname : symbol}});
  //  if(stock_exists)
  //  return res.status(400).json("already added");
  
user.updateOne({ user: id }, { $addToSet: { favouritestocks: symbol }}, function(
    err,
    result
  ) {
    if (err) {
    console.log(err)
    } else {
      
      res.status(200).json( "added");
      console.log(result);
    }
  });
});
module.exports=router;
