const  User = require('../schemas/userschema');
const Portfolio = require('../schemas/portfolio');
const express = require('express');
const router = express.Router();
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');
async function getPrice(symbol){
    const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
    const data = await (await response).json();
    var price = data.price;
    return price;
    }



   router.post("/",async function(req,res){
     var Email =req.body.Email;
     var symbol =req.body.company;
     var No = req.body.volume;
     console.log(Email);
     console.log(symbol);
     console.log(No);


     let users = await User.findOne({email:Email});
  var id = users.id;
 
 
    
     var price = await getPrice(symbol);
     console.log(price);
 Portfolio.updateOne({ user: id }, { $addToSet: { stocksowned: [{stockname :symbol,
    stockvolume:No,
    boughtprice:(price*No)
}]} }, function(
err,
result
) {
if (err) {
console.log(err)
} else {


console.log(result);
}
});

    Portfolio.findOneAndUpdate( {'user': id}, 
        {$inc: {'Wallet': -price*No}}, 
        
        function(err, result) { 
             if (err) throw err;
             else{
                 console.log("modified");
                 console.log(result);
                
             }
        });



     
  
  
    
    
    
   })
   module.exports=router;