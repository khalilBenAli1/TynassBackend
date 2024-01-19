const mongoose=require("mongoose")

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = { Participant };