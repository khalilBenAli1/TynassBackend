const mongoose = require("mongoose");
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
        type: String
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

module.exports = QRCodeModel;
