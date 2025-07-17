const express = require("express");
const router = express.Router();
const { downloadReport } = require("../controllers/pdfController");
const protect = require("../middlewares/authMiddleware");

router.get("/:id", protect, downloadReport);

module.exports = router;
