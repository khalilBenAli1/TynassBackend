const mongoose=require("mongoose")

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    team:String,
    score: {
        type: Number,
        default: 0,
    },
    accomplishedMissions: {
        type: [String],
        default: [],
    },
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = { Participant };