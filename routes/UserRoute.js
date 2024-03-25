const express = require("express");
const router = express.Router();
const isAuthenticated=require('../middleware/checkAuth')
const {
  createUser,
  LoginUser,
  logout,
  checkAuth,
  getTrips,
  getAdminTrips,
} = require("../controllers/UserController");

router.post("/add", createUser);
router.post('/login', LoginUser);
router.get('/logout', logout);
router.get('/check-authentication',checkAuth);
router.get("/trips", isAuthenticated, getTrips);
router.post("/admin-trips", getAdminTrips);


module.exports = router; 






