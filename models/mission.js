const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: String,
    isCorrect: Boolean,
}, { _id: false });

const missionSchema = new mongoose.Schema({
    missionName: { type: String, required: true },
    description: { type: String, required: true },
    codeSolution: { type: String, default: null },
    time: { type: Number, default: null },
    scorePoint: { type: Number, required: true },
    experienceURL: { type: String, default: null },
    difficulty: { type: String, default: null },
    long: { type: String, default: null },
    lat: { type: String, default: null },
    hint: { type: String, default: null },
    hintCost: { type: Number, default: null },
    coverImage: { type: String, default: null },
    missionImage: { type: String, default: null },
    mediaType: { type: String, default: null },
    arabeAudio: { type: String, default: null },
    englishAudio: { type: String, default: null },
    frenchAudio: { type: String, default: null },
    quizType: { type: String, required: true },
    accomplished: { type: Boolean, default: false },
    answers: { type: [answerSchema], default: undefined },
    numberOfTrials: { type: Number, default: null },
}, { timestamps: true });

module.exports = missionSchema;
