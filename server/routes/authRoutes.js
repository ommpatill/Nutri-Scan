const express = require("express");
const router = express.Router();
const {
  signup,
  verifyOTP,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");

// Public Routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
