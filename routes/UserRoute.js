const express = require("express");
const router = express.Router();

const {
  createUser,
  LoginUser
} = require("../controllers/UserController");

router.post("/add", createUser);
router.post('/login', LoginUser);



module.exports = router; 






