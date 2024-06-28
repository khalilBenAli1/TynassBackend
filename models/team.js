const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }],
  score: {
    type: Number,
    default: 0
  }
});

teamSchema.methods.calculateScore = async function () {
  let totalScore = 0;
  for (let participantId of this.participants) {
    const participant = await mongoose.model('Participant').findById(participantId);
    if (participant) {
      totalScore += parseInt(participant.score, 10) || 0;
    }
  }
  this.score = totalScore;
  await this.save();
};

module.exports = teamSchema;
