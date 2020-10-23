var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  username:{type: String , required:true, index: true, unique:true},
  email:{type: String, required:true, index: true, unique:true},
  password:{type: String, required:true}
});

module.exports = mongoose.model('User', UserSchema)
//

