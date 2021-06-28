const  User = require('../schemas/userschema');
const Portfolio = require('../schemas/portfolio');
const express = require('express');
var mongoose =require('mongoose');
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');
var router=express.Router();

async function getPrice(symbol){
    const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
    const data = await (await response).json();
    var price = data.price;
    return price;
    }



router.post("/",async function(req,res){
   
    

   
        

            const ID=req.body.object;
            const Email=req.body.email;
            const symbol = req.body.symbol;
            const volume = req.body.volume;
            console.log(Email);
            console.log(symbol);
            console.log(volume);
           
            
           
            
            let user = await User.findOne({email:Email});
             let id = user.id;
             console.log(id);
             
             var price = await getPrice(symbol);
             console.log(price);
            
            
            

            Portfolio.updateOne({ user:id }, { "$pull": { "stocksowned": { "_id": ID } }}, { safe: true, multi:true }, function(err, obj) {
                //do something smart
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted : ", obj);
                }
            });
            Portfolio.findOneAndUpdate( {'user': id}, 
        {$inc: {'Wallet': price*volume}}, 
        
        function(err, result) { 
             if (err) throw err;
             else{
                 console.log("modified");
                 console.log(result);
                
             }
        });
            // Portfolio.findByIdAndDelete(ID, function (err, docs) {
            //     if (err){
            //         console.log(err)
            //     }
            //     else{
            //         console.log("Deleted : ", docs);
            //     }})

        
            
            
        //     User.find(
        //         { "BStock._id": ID },
        //        async function(err, result) {
        //           if (err) {
        //             throw (err);
        //           } else {
        //               var i=0;
                      
        //             while(i<=result[0].BStock.length)
        //             {
        //                 if(result[0].BStock[i]._id==ID){
        //                     console.log(result[0].BStock[i].symbol);
        //                     var symbol=result[0].BStock[i].symbol;
        //                     var No=result[0].BStock[i].volume
                            
        //                     break;
        //                 }
        //                 else
        //                 i++;
                    
        //             }

        //             var price = await getPrice(symbol);
        //             var inc=price*No;
        //             console.log(price);
        //             console.log(inc);
        
        //     User.updateOne( { "BStock._id": ID }, {  $pull: { BStock: { _id: ID }}}, 
        //     function( err,result){
        //         if (err) 
        //         console.log(err);
        //          else 
        //         console.log(result);
                
        //       })
        //       User.findOneAndUpdate(  { "email": Email }, 
        //       {$inc: {"Wallet":inc }}, 
              
        //       function(err, result) { 
        //            if (err) throw err;
        //            else{
        //                console.log("modified");
                       
                       
        //            }
        //       });
        // }
        
        
          
          
          
        
        // //
        
        
        //           }
                
        //       )
        //       res.sendFile(path.join(__dirname,'../frontpage.html'))
                });
                module.exports=router;
              

              


           /* var price = await getPrice(symbol);
            console.log(price);

    User.updateOne({ email: "lodulalit@gmail.com" }, {  $pull: { BStock: { _id: "5f99595d5c09b66638f6eabc"  }}}, 
    function( err,result){
        if (err) 
        console.log(err);
         else 
        console.log(result);
        
      })
      User.findOneAndUpdate( {'email': "lodulalit@gmail.com"}, 
      {$inc: {'Wallet': price*10}}, 
      
      function(err, result) { 
           if (err) throw err;
           else{
               console.log("modified");
               console.log(result);
           }
      });
}
h();*/

  
  
  

//


