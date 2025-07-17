const axios = require("axios");

/**
 * Generate personalized health recommendations using Gemini API.
 * Works for both deficiencies and "Normal" predictions.
 * 
 * @param {string} result - The prediction result, e.g., "Vitamin D" or "Normal".
 * @param {number} age - The user's age.
 * @returns {Promise<string>} - The generated recommendation text.
 */
const generateRecommendation = async (result, age) => {
  const isHealthy = result.toLowerCase() === "normal";

  const prompt = isHealthy
    ? `The user is ${age} years old and has no signs of any vitamin or nutrient deficiency based on the analysis. Provide general health tips, diet suggestions, and lifestyle advice to maintain good health. Include 3–5 bullet points in a clear and friendly tone.`
    : `The user is ${age} years old and is predicted to have a ${result} related health concern. Please provide clear, friendly, and informative health recommendations. Include suitable foods, daily habits, and supplements that may help. The advice should be personalized and presented as 3–5 bullet points.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: "user",
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const text =
      response.data.candidates[0]?.content?.parts[0]?.text ||
      "No recommendation generated.";
    return text;
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return "Failed to generate recommendation.";
  }
};

module.exports = generateRecommendation;
