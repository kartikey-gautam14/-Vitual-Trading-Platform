const mongoose = require("mongoose");
const { User} = require('./trash2');
const users = require('./router.js');

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
//


User.updateOne({ email: "golagolu@gmail.com" }, { $addToSet: { favourites: ["AAPL"] } }, function(
  err,
  result
) {
  if (err) {
  console.log(err)
  } else {
    console.log(result);
  }
});





//User.findOneAndUpdate(
    //{ email: "srishti@gmail.com" }, 
    //{ $push: { favourites:  {company : 'AAPL'} } },
  // function (error, success) {
         //if (error) {
           //  console.log(error);
         //} else {
          //   console.log(success);
        //     console.log("done")
      //   }
    // });