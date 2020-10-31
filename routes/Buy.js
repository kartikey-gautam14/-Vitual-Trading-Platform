const { User, validate } = require('../database');
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');



   router.post("/",function(req,res){
     var Email =req.body.Email;
     var symbol =req.body.company;
     var No = req.body.volume;


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

  async function getPrice(symbol){
  const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
  const data = await (await response).json();
  var price = data.price;
  return price;
  }
  async function  h(){
     var price = await getPrice(symbol);
 User.updateOne({ email: Email }, { $addToSet: { BStock: [{symbol :symbol,
                                                           volume:No,
}]} }, function(
err,
result
) {
if (err) {
console.log(err)
} else {
flag=1;

console.log(result);
}
});

    User.findOneAndUpdate( {'email': Email}, 
        {$inc: {'Wallet': -price*No}}, 
        
        function(err, result) { 
             if (err) throw err;
             else{
                 console.log("modified");
                 console.log(result);
             }
        });



     
  }
  h();
  
    
    
    
   })
   module.exports=router;