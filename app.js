const express = require('express');
const Joi =require('joi');
const app = express();
var bodyparser = require('body-parser')
var path =require('path')
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var fetch=require('node-fetch');
var sell=require('./routes/Sell.js')
var buyps=require('./routes/buy.js')
const user = require('./schemas/userschema');
const getfav = require('./routes/getfav');
const users = require('./routes/registration.js');
const { User, validate } = require('./database');
const log = require('./routes/login');
var detail=require('./routes/addfav.js');
var getbought = require('./routes/getbought');
const { getMaxListeners } = require('process');
const getwallet = require('./routes/getwallet');
var cors = require('cors')

app.use(cors())
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')





//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
//
mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true }))

app.listen(5000,()=>{
    console.log("server is working")
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/getfav',getfav);
app.use('/registration', users);
app.use('/login', log);
app.use('/details',detail);
app.use('/sell',sell)
app.use('/buyps',buyps);
app.use('/getbought',getbought);
app.use('/getwallet',getwallet);



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'register.html'));
   });

   app.get('/logi', function (req, res) {
    res.sendFile(path.join(__dirname,'login.html'));
   });
   app.get('/frontpage', function (req, res) {
    res.sendFile(path.join(__dirname ,'frontpage.html'));
   });
   app.get('/buys', function (req, res) {
    res.sendFile(path.join(__dirname,'Buy.html'));
   });
   app.get('/current', function (req, res) { 
     Email=req.query.abc;
    User.find({email : Email}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
          console.log("ss");
            res.render('index',{user : result[0].BStock});
        }
    })
    })

    app.get('/fav', function (req, res) { 
        Email=req.query.Email;
        async function getPrice(symbol){
            const response =fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`);
            const data = await (await response).json();
            var price = data.price;
            return price;
            }
       User.find({email : Email}, async function (err, result) {
           if (err) {
               console.log(err);
           } else {
            console.log(result[0].favourites);
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
    
             
               res.render('fav',{user : arr,user1 : result[0].favourites});
           }
       })
       });

       app.post('/Wallet',function(req,res){
           Email =req.body.email;

           User.find({email : Email},function(err,result){
               if(err)
               throw err;
               else
               res.json(result[0].Wallet);
           })

       });

    app.get('/addfav', function (req, res) {   
      res.sendFile(__dirname + '/stock.html')
      })

    //   app.get('/sell', function (req, res) {   
    //     res.sendFile(__dirname + '/sell.html')
    //     });
  
  

  
   
   

        
      

    


 

