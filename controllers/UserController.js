const { User } = require("../models/User");
const passport = require("passport");
const isAuthenticated = require("../middleware/checkAuth");
const { Trip } = require('../models/Trip');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(`connected ${user}`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },

  LoginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info.message);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).send(user);
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error during logout");
      }
      res.status(200).send("Logged out successfully");
    });
  },

  checkAuth: (req, res) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    if (req.isAuthenticated()) {
      console.log("User is authenticated:", req.user);
      res.json({ isAuthenticated: true, user: req.user });
    } else {
      console.log("User is not authenticated");
      res.json({ isAuthenticated: false });
    }
  },
  getTrips: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).populate("trips");
      res.status(200).json(user.trips);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },

  getAdminTrips: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        console.log(userId)
        return res.status(404).send('User not found.');
      }

      const tripDetails = await Promise.all(
        user.adminTrips.map(async (tripId) => {
          return await Trip.findById(tripId);
        })
      );

      res.status(200).json(tripDetails);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  updateSplashScreen: async (req, res) => {
    const { userId } = req.params;
    const { splashText, splashColor, splashImage } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found.');
      }
      user.splashText = splashText;
      user.splashColor = splashColor;
      user.splashImage = splashImage;

      await user.save();

      res.status(200).json({ message: "Splash screen updated successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
};
