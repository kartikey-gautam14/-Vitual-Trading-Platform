const mongoose = require("mongoose");
const { User} = require('./trash2');
const users = require('./router.js');
const fetch= require("node-fetch")

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


//


 
     //Email = "lodulalit";
      var symbol = "MSFT";


     
     var Email ="lodulalit@gmail.com";
     var No =10;
     var flag=0;

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
  

 
    