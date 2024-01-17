const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    address: String, 
    city: String,
    state: String,
    zip: String,
    country: String,
    latitude: Number,
    longitude: Number
});


const Location = mongoose.model('User', locationSchema);
module.exports = { Location };