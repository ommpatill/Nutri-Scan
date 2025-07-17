const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

dotenv.config();
const app = express();

// MongoDB connection flag
let isConnected = false;

// MongoDB connection function
const connectDBAsync = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
    isConnected = true;
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    isConnected = false;
    setTimeout(connectDBAsync, 5000);  // Retry after 5 seconds if connection fails
  }
};

// Initial DB connection attempt
connectDBAsync();

// Middleware setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow only your frontend domain
  methods: ["GET", "POST"],
  credentials: true, // if sending cookies/tokens
};

app.use(cors(corsOptions)); // Set up CORS with restricted origins
app.use(express.json({ limit: "10mb" })); // Increase body size limit if needed
app.use(express.urlencoded({ extended: true }));

// Static route for image uploads if needed
app.use("/uploads", express.static("uploads"));

// Set up express-fileupload middleware for handling file uploads
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
    createParentPath: true, // Ensure parent directories are created if they don't exist
    safeFileNames: true, // Avoid overwriting files
    abortOnLimit: true, // Stop if the file size limit is exceeded
    useTempFiles: true, // Enable temp files for processing
    tempFileDir: '/tmp/', // Set the temp directory for file uploads
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        console.error("File is not an image");
        return cb(new Error("Only image files are allowed"));
      }
      console.log("File uploaded successfully");
      cb(null, true); // Allow the file
    },
  })
);

// Route setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/gemini", geminiRoutes); // Gemini AI-related routes
app.use("/api/pdf", pdfRoutes); // PDF generation routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);

  // Differentiate error types for better responses
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: "File size limit exceeded" });
  } else if (err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  // Generic error response
  res.status(500).send("Server Error");
});

// Delay server start until DB is connected
const startServer = () => {
  if (isConnected) {
    const PORT = process.env.PORT || 60000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.log("Waiting for MongoDB connection...");
    setTimeout(startServer, 5000); // Retry after 5 seconds
  }
};

// Start the server after MongoDB connection is established
startServer();
