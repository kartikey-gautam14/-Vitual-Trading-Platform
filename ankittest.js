const mongoose = require("mongoose");
const { User, validate } = require('./database');

const fetch= require("node-fetch")

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


//

    
async function getPrice(symbol){
    const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
    const data = await (await response).json();
    var price = data.price;
    return price;
    }
    async function  h(){
        User.find(
            { email: "golagolu@gmail.com" },
           async function(err, result) {
              if (err) {
                throw (err);
              } else {console.log(result[0].favourites);
        var i=0;
        var arr=[];
        console.log(result[0].favourites.length)
        while(i<result[0].favourites.length){
        var symbol =result[0].favourites[i];
    
        var price = await getPrice(symbol);
        
        arr.push(price);
        i++;
        
    }
    console.log(arr);
}})};
    h();
    
 
   
    