const express = require("express");
const router = express.Router();

const {
  createUser,
  LoginUser,
  logout,
  checkAuth
} = require("../controllers/UserController");

router.post("/add", createUser);
router.post('/login', LoginUser);
router.get('/logout', logout);
router.get('/check-authentication',checkAuth);
router.get("/trips", isAuthenticated, userController.getTrips);
router.get("/admin-trips", isAuthenticated, userController.getAdminTrips);


module.exports = router; 






