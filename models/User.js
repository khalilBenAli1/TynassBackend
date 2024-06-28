const mongoose = require("mongoose");
const hashPassword = require("../middleware/hashPassword");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId;
      },
    },
    phoneNumber: {
      type: Number,
      required: function() {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    LegalPaper: [String],
    trips: [String],
    currentTrip: {
      type: String,
    },
    adminTrips: [String],
    splashText: {
      type: String,
      default: '',
    },
    splashColor: {
      type: String,
      default: '#FFFFFF',
    },
    splashImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", hashPassword);
const User = mongoose.model("User", userSchema);
module.exports = { User };
