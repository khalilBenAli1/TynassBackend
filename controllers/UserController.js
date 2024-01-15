const { User } = require("../models/User");
const passport = require("passport");
const isAuthenticated=require('../middleware/checkAuth')

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
        return res.status(200).send(`connected ${user}`);
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/login");
  },

  checkAuth:(req, res) => {
    if (req.isAuthenticated()) {
        res.send('User is authenticated');
    } else {
        res.send('User is not authenticated');
    }}

};
