const { User, validate } = require('../database');
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');




router.post("/",function(req,res){
    var Email=req.body.Email;
User.updateOne({ email: Email }, { $addToSet: { favourites: [symbol]} }, function(
    err,
    result
  ) {
    if (err) {
    console.log(err)
    } else {
      
      console.log(result);
    }
  });
});
module.exports=router;
