const express = require("express");
const router = express.Router();

const {
  createUser,
  LoginUser
} = require("../controllers/UserController");

router.post("/add", createUser);
router.post('/login', LoginUser);



module.exports = router; 








// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/", // Redirect to another route on success
//     failureRedirect: "/login", // Redirect back to login page on failure
//     failureFlash: true, // Optional, allows for messages on failed attempts
//   })
// );

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

// app.get("/protected-route", checkAuthenticated, (req, res) => {
//   // Only authenticated users can access this
//   res.send("Protected Route");
// });

// app.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/login");
// });
