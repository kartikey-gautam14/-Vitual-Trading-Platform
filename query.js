const { User, validate } = require('./database');
const express = require('express');
var mongoose =require('mongoose');
var path =require('path');
var bcrypt=require('bcrypt');
var fetch=require('node-fetch');

mongoose.connect('mongodb://localhost/mongo-games',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


    User.find(
        { "BStock._id": "5f9959c688131a15fc9763a1" },
        function(err, result) {
          if (err) {
            throw (err);
          } else {
              var i=0;
              
            while(i<=result[0].BStock.length)
            {
                if(result[0].BStock[i]._id=="5f9959c688131a15fc9763a1"){
                    console.log(result[0].BStock[i].symbol);
                    break;
                }
                else
                i++;
            
            }
          }
        }
      );
    
        
    