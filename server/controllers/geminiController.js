const generateRecommendation = require("../utils/geminiAPI"); // Assuming this is your helper function to interact with the Gemini API

// Controller function to fetch recommendation based on result and age
exports.getRecommendation = async (req, res) => {
  const { result, age } = req.body;

  // Ensure both result and age are provided in the request body
  if (!result || !age) {
    return res.status(400).json({ message: "Result and age are required." });
  }

  try {
    // Call the helper function that interacts with Gemini API to fetch the recommendation
    const recommendation = await generateRecommendation(result, age);

    // Respond with the recommendation
    res.status(200).json({ recommendation });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Recommendation error:", err);
    
    // Send an error response if something goes wrong
    res.status(500).json({ message: "Failed to get recommendation." });
  }
};
