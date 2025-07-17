// server/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController"); // Correct import here
const protect = require("../middlewares/authMiddleware"); // Ensure this import is correct

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Protected
router.get("/profile", protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Protected
router.put("/profile", protect, updateProfile);

module.exports = router; // Correct export
