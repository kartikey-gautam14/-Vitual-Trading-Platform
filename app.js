const express = require('express');
const Joi =require('joi');
const app = express();
var bodyparser = require('body-parser')
var path =require('path')
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var fetch=require('node-fetch');

const users = require('./routes/registration.js');
const { User, validate } = require('./database');
const log = require('./routes/login');
var detail=require('./routes/Buy')
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')




//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
//
mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true }))

app.listen(3000,()=>{
    console.log("server is working")
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/registration', users);
app.use('/login', log);
app.use('/details',detail);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','register.html'));
   });

   app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','login.html'));
   });
   app.get('/frontpage', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','frontpage.html'));
   });
   app.get('/buys', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','Buy.html'));
   });
   app.get('/current', function (req, res) {   
    User.find({email : "lodulalit@gmail.com"}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
          console.log("ss");
            res.render('index',{user : result[0].BStock});
        }
    })
    })

    app.get('/addfav', function (req, res) {   
      res.sendFile(__dirname + '/stock.html')
      })



  
   
   

        
      

    


 

