const express = require("express");
const router = express.Router();
const { getRecommendation } = require("../controllers/geminiController");
const protect = require("../middlewares/authMiddleware"); // Assuming you are using some kind of JWT or session-based authentication

// POST route for getting recommendations (protected route)
router.post("/recommend", protect, getRecommendation);

module.exports = router;
