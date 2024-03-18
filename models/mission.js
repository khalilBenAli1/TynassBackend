const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    missionName: String,
    description: String,
    codeSolution: String,
    time: Number,
    scorePoint: Number,
    experienceURL: String,
    difficulty: String,
    long: Number,
    lat: Number,
    hint: String,
    hintCost: Number,
    coverImage: String,
    missionImage: String,
    mediaType: String,
});

module.exports = missionSchema;