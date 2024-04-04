const mongoose = require("mongoose");
const QRCode = require("qrcode");
const missionSchema = require('./mission');
const instructionSchema =require('./Instruction')
const tripSchema = new mongoose.Schema({
  tripType: {
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
  fixedTime: {
    type: String,
  },
  gameOverMessage: {
    type: String,
  },
  latitude: Number,
  longitude: Number,
  EmergencyContact: String,
  instruction: [instructionSchema],
  qrCode: {
    data: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  accessCode: {
    type: String,
    unique: true
},
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }],
  missions: [missionSchema],
  memoryMail: {
    type: [String],
  },
  

},
{
  timestamps: true,
}
);

function generateUniqueCode() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
tripSchema.pre('save', async function (next) {
  if (this.isNew || !this.accessCode) {
      let unique = false;
      let uniqueCode;
      while (!unique) {
          uniqueCode = generateUniqueCode();
          const existingTripWithCode = await mongoose.models.Trip.findOne({ accessCode: uniqueCode });
          if (!existingTripWithCode) {
              unique = true;
          }
      }
      this.accessCode = uniqueCode;
  }
  next();
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
