const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    missionName: String,
    description: String,
    codeSolution: String,
    time: Number,
    scorePoint: Number,
    experienceURL: String,
    difficulty: String,
    long: String,
    lat: String,
    hint: String,
    hintCost: Number,
    coverImage: String,
    missionImage: String,
    mediaType: String,
    arabeAudio:String,
    englishAudio:String,
    frenchAudio:String,
    mediaType:String,
    quizType:String,
    accomplished:Boolean
});

module.exports = missionSchema;