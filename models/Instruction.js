const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  Rules:{
    type:[String],
    required:true
  }
});


const Instruction = mongoose.model('Instruction', instructionSchema);
module.exports = { Instruction };