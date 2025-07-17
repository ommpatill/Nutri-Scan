const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const Result = require('../models/Result');

exports.predictDeficiency = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files?.image) {
      console.error("⚠️ No image file uploaded");
      return res.status(400).json({ error: 'Image file is missing' });
    }

    const filename = req.files.image.name;
    console.log(`📸 File uploaded: ${filename}`);

    // Prepare the image file for the prediction API
    const form = new FormData();
    form.append('file', fs.createReadStream(path.join(__dirname, '..', 'uploads', filename)));

    // Log the form data headers and file
    console.log("📝 Sending form data:", form.getHeaders());

    // Call the Flask API to predict the deficiency
    const flaskResponse = await axios.post('http://127.0.0.1:5001/predict', form, {
      headers: form.getHeaders(),
    });
    

    // Log the response from Flask API
    console.log("Flask response:", flaskResponse.data);

    if (!flaskResponse.data || !flaskResponse.data.result || !flaskResponse.data.confidence) {
      console.error("⚠️ Invalid response from Flask API", flaskResponse.data);
      return res.status(500).json({ error: 'Invalid response from Flask API' });
    }

    const { result, confidence } = flaskResponse.data;

    // Convert confidence to number by stripping '%' and parsing it
    const numericConfidence = parseFloat(confidence.replace('%', ''));

    // Log prediction and confidence
    console.log(`✅ Prediction: ${result}, Confidence: ${numericConfidence}%`);

    // Call the Gemini API for recommendations based on the prediction
    const geminiResponse = await axios.post('http://127.0.0.1:5000/gemini', {
      query: result,
    });

    // Log the response from Gemini API
    console.log("Gemini response:", geminiResponse.data);

    const recommendation = geminiResponse.data.recommendation;

    // Save the result in the database
    const resultData = new Result({
      user: req.user._id,
      prediction: result,
      confidence: numericConfidence,
      image: filename,
      recommendation,
    });

    await resultData.save();
    console.log("✔️ Result saved to database");

    // Respond with the prediction, confidence, and recommendation
    res.json({
      prediction: result,
      confidence: numericConfidence,
      image: filename,
      recommendation,
    });

  } catch (error) {
    // Log the error details
    console.error("❌ Error during prediction:", error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
};
