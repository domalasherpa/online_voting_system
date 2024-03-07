const mongoose =require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userRegistration =mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    uniqueCaseInsensitive:true,
    required:true
  },
  phonenumber:{
    type:Number,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  
})

userRegistration.plugin(uniqueValidator,{message:'{value} is alerady exist'});
module.exports = mongoose.model("data", userRegistration);; 