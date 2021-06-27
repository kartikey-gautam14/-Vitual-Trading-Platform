

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    stocksowned : [
        {
            stockname:{
                type:String,
                required:true,
            },
            stockvolume:{
                type:Number,
                required:true,
            },
            boughtprice:{
                type:Number,
                required:true,
            }
            

        }
    ],
    favouritestocks : [
    String,
        
    ],
    transactions:[
        {
            stockname:String,
            volume:Number,
            boughtat:Number,
            soldat:Number,
        }

    ]
});
module.exports = mongoose.model('portfolio',UserSchema);