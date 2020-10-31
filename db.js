const { User, validate } = require('./database');
const express = require('express');
var mongoose =require('mongoose');
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

    async function getPrice(symbol){
        const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
        const data = await (await response).json();
        var price = data.price;
        return price;
        }
        async function  h(){
            var price = await getPrice(symbol);

    User.updateOne({ email: "lodulalit@gmail.com" }, {  $pull: { BStock: { _id: "5f99595d5c09b66638f6eabc"  }}}, 
    function( err,result){
        if (err) 
        console.log(err);
         else 
        console.log(result);
        
      })
      User.findOneAndUpdate( {'email': Email}, 
      {$inc: {'Wallet': price*No}}, 
      
      function(err, result) { 
           if (err) throw err;
           else{
               console.log("modified");
               console.log(result);
           }
      });
}
h();

  
  
  

//


