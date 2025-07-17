from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import logging
import threading
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Allow requests from localhost:5000 (your frontend)
CORS(app, origins="http://localhost:5000")

# Logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Load the trained model
MODEL_PATH = 'model.h5'
model = load_model(MODEL_PATH)
logging.info(f"✅ Model loaded from {MODEL_PATH}")

# Class labels based on dataset used for training
CLASS_LABELS = [
    'Normal Eye', 'Normal Nails', 'Normal Skin', 'Normal Tongue',
    'Vitamin A Deficiency', 'Vitamin B12 Deficiency', 'Vitamin D Deficiency', 'Zinc Deficiency'
]

# Background function to check if the server is running
def check_flask_status():
    while True:
        logging.info("Flask app is running and ready to process requests.")
        time.sleep(60)

# Start the Flask status check in a background thread
status_thread = threading.Thread(target=check_flask_status, daemon=True)
status_thread.start()

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Check if the file is part of the request
        if 'image' not in request.files:
            logging.error("No 'image' field in the request")
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['image']
        
        # Check if the file has a valid filename
        if file.filename == '':
            logging.error("No file selected")
            return jsonify({'error': 'No file selected'}), 400

        # Process the file (add logging for debugging)
        logging.debug(f"Received file: {file.filename}")
        img = Image.open(file).convert('RGB')
        img = img.resize((244, 244))
        img = np.array(img) / 255.0
        img = np.expand_dims(img, axis=0)
        
        # Perform prediction
        predictions = model.predict(img)
        predicted_index = np.argmax(predictions)
        predicted_label = CLASS_LABELS[predicted_index]
        confidence = float(predictions[0][predicted_index]) * 100
        
        logging.info(f"Prediction: {predicted_label} ({confidence:.2f}%)")
        
        # Ensure the response matches the frontend expectations
        return jsonify({
            'result': predicted_label,  # Change 'deficiency' to 'result'
            'confidence': f"{confidence:.2f}%"  # Ensure confidence format matches frontend
        })

    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
