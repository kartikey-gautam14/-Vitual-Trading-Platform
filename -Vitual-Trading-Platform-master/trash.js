var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  //mongoose
 
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

// Get Homepage
router.get('/', function(req, res){
    res.render('index');
});

router.get('/register',function(req,res){
    res.render('register');
});

// submit form
router.post('/submit', function(req, res){

    // retrieve data from posted HTML form
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

    // express validator
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Invalid email').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password','Password must contain at least 6 characters').isLength({min:6});
    req.checkBody('password_confirm','Password mismatch').equals(req.body.password);

    // store the errors
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
            // console.error is same, but in stderr form
            else{
                console.log('new user saved successfully');
                console.log(newUser);
            }
        });
        res.redirect('/');
    }
});

module.exports = router;
//
app.post('/authenticate', function(req, res) {
    var user = new User({
      username: req.body.username
    });
  
    user.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.status(500).send({ succes: false, message: 'User already exist!' });
        }
  
        // Some other error
        return res.status(500).send(err);
      }
  
      res.json({
        success: true
      });
  
    });
  })


  <div class="form-group">
  <label for="password_confirm">CONFIRM PASSWORD</label>
  <input  id="password_confirm" name="password_confirm">
</div>