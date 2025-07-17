// server/routes/predictRoutes.js

const express = require("express");
const router = express.Router();
const { predictDeficiency } = require("../controllers/predictController");
const { protect } = require("../middlewares/authMiddleware"); // Use destructuring for consistency

// @route   POST /api/predict
// @desc    Predict vitamin deficiency from image
// @access  Protected
router.post("/", protect, predictDeficiency);

module.exports = router;
