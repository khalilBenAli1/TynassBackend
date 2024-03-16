const mongoose = require("mongoose");
const QRCode = require("qrcode");

const tripSchema = new mongoose.Schema({
  tripType: {
    type: String,
    required: true,
    trim: true,
  },
  quizType: {
    type: String,
    required: true,
    trim: true,
  },
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
  Instruction: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instruction'
  }],
  qrCode: {
    data: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }]
});

tripSchema.methods.generateQRCode = async function() {
  try {
    const qrData = await QRCode.toDataURL(this._id.toString());
    this.qrCode = { data: qrData };
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

const Trip = mongoose.model("Trip", tripSchema);
module.exports = {Trip};
