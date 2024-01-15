const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectToDatabase = async () => {
  const dbConnection = process.env.MONGO_URI;

  try {
    await mongoose.connect(dbConnection);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
module.exports = { connectToDatabase };