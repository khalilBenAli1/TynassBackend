const express = require("express");
const router = express.Router();
const passport = require('passport');

const isAuthenticated=require('../middleware/checkAuth')
const {
  createUser,
  LoginUser,
  logout,
  checkAuth,
  getTrips,
  getAdminTrips,
  updateSplashScreen
} = require("../controllers/UserController");

router.post("/add", createUser);
router.post('/login', LoginUser);
router.get('/logout', logout);
router.get('/check-authentication',checkAuth);
router.get("/trips", isAuthenticated, getTrips);
router.post("/admin-trips", getAdminTrips);
router.post("/updateSplashScreen/:userId", updateSplashScreen);
router.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log("connectedwith google",req.user.token)
   const token =req.user.token
   res.redirect(`exp://192.168.0.214:8081?token=${token}`)
  });

module.exports = router; 






