const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const findUserByEmail = async (UserEmail) => {

  try {
    const user = await User.findOne({ email: UserEmail });
    if (!user) {
      console.log("User not found");
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
  }
};
const verifyPassword = async (user, providedPassword) => {
  try {
    return await bcrypt.compare(providedPassword, user.password);
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};

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

  LoginUser: async (req, res) => {
    try {
      const user = await findUserByEmail(req.body.email);

      if (user && (await verifyPassword(user, req.body.password))) {
        res.status(201).send(`connected ${user}`);
      } else {
        res.status(401).send("Invalid email or password");
      }
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
  logout:(req, res) => {
      req.logout();
      res.redirect("/login");
    }
};
