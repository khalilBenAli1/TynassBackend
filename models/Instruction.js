const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  rules:{
    type:[String],
    required:true
  }
});



module.exports =  instructionSchema ;