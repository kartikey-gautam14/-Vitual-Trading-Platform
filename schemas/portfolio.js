

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      Wallet: {
        type : Number,
        default : 5000,
    }, 
    Profit: {
        type : Number,
        default : 0,
    }, 
    Loss: {
        type : Number,
        default : 0,
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