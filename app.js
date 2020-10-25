const express = require('express');
const Joi =require('joi');
const app = express();
var bodyparser = require('body-parser')
var path =require('path')
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

const users = require('./router.js');
const { User, validate } = require('./trash2');
const log = require('./log');




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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','register.html'));
   });

   app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','login.html'));
   });
   
  /* app.post('/registration', function (req, res) {

       
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

    //body('username').isEmail(),

       // express validator
       req.checkBody('username','Username is required').notEmpty();
       req.checkBody('email','Email is required').notEmpty();
       req.checkBody('email','Invalid email').isEmail();
       req.checkBody('password','Password is required').notEmpty();
       req.checkBody('password','Password must contain at least 6 characters').isLength({min:6});
       req.checkBody('password_confirm','Password mismatch').equals(req.body.password);

       var errors = req.validationErrors();
       if(errors){res.render('register',{errors:errors});}
       else {
           // hash password
           var salt = bcrypt.genSaltSync(10);
           var hash = bcrypt.hashSync(password, salt);
           password=hash;
   
           // load data into model
           var newUser = new User ({username:username, email:email, password:password});
           // save the new user
           newUser.save(function(err,newUser){
               if(err){console.error(err);}
      */
       
      // console.log(myobj);

       //MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
         //if (err)
           //throw err;
        
      

    


 /*app.post('/login', (req, res) => {
    
   
      var username = req.body.username;
      var Password = req.body.Password;
    
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },function(err,db){
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { username : req.body.username  };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    
    if(result[0].Password === req.body.Password){
      res.sendFile(path.join(__dirname, '../gareebo ke buffet_2','stock.html'));
    }
    else{
      throw 'Error';
    }
    

    
  
    
    db.close();
        
            
    });
  });
});*/

