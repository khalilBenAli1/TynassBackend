const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  tripname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  teamNumber: {
    type: Number,
  },
  startingDate: {
    type: Date,
  },
  fixedDate: {
    type: Date,
  },
  gameOverMsg: {
    type: String,
  },
  returnLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  EmergencyContact: String,
  Instruction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instruction'
  },
  qrCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }]
});


const Trip = mongoose.model("Trip", tripSchema);
module.exports = { Trip};
