const mongoose = require("mongoose");
const Location = require("./Location");
const Instruction = require("./Instruction");
const QRCode = require("qrcode");

const qrCodeSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    associatedTrip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    },
    accessCode:{
        type:String
    }
    
});
qrCodeSchema.statics.generateQRCodeData = async function(tripId) {
    try {
        return await QRCode.toDataURL(tripId.toString());
    } catch (error) {
        throw error;
    }
};

const QRCodeModel = mongoose.model("QRCode", qrCodeSchema);

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
  returnLocation: Location,
  EmergencyContact: String,
  Instruction: Instruction,
  qrCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode'
}
});


const Trip = mongoose.model("Trip", tripSchema);
module.exports = { Trip , QRCodeModel };
