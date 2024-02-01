const { User } = require("../models/User");
const passport = require("passport");
const isAuthenticated = require("../middleware/checkAuth");

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
    if (req.isAuthenticated()) {
      res.json({ 
        isAuthenticated: true, 
        user: req.user
    });
    } else {
      res.send("User is not authenticated");
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
      const userId = req.user._id;
      const user = await User.findById(userId).populate("adminTrips");
      res.status(200).json(user.adminTrips);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
};
