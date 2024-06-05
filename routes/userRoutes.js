const express = require("express");
const { login, changePassword } = require("../controllers/userController");
const { generateOtp, verifyOtp } = require("../controllers/otpController");
const {
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/CRUDUsers");

const router = express.Router();

// Login Route
router.post("/login", login);
router.post("/change-password", changePassword);

// CRUD User Routes
router.post("/createUser", createUser);
router.put("/editUser", editUser);
router.delete("/deleteUser", deleteUser);

// OTP Routes
router.post("/sendOtp", generateOtp);
router.post("/checkOtp", verifyOtp);
module.exports = router;
