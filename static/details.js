const mongoose = require("mongoose");
const { User} = require('../trash2');
const users = require('../router.js');

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


async function update_fav(Email,symbol){
  User.updateOne({ email: Email }, { $addToSet: { favourites: [symbol] } }, function(
    err,
    result
  ) {
    if (err) {
    console.log(err)
    } else {
      console.log(result);
    }
  });
}