import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImage(file);
  };

  const handlePaste = (e) => {
    const item = e.clipboardData.items[0];
    if (item && item.type.includes("image")) {
      const file = item.getAsFile();
      handleImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setProcessing(true);

    // Define the backend API URL in a variable
    const apiUrl = "http://localhost:5001/api/predict"; 

    try {
        const formData = new FormData();
        formData.append("image", image);

        // Use the variable for the URL in the request
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Log the response to ensure data is being returned
        console.log(res.data);

        // Navigate to result screen with the received data
        navigate("/result", { state: res.data });
    } catch (err) {
        console.error("Upload failed:", err);
        alert("Prediction failed. Please try again.");
        setProcessing(false);
    }
};

  
  
  
  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Upload Your Image
      </h1>

      {!image && (
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full max-w-md h-60 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center text-blue-500 cursor-pointer bg-white hover:shadow-md transition"
        >
          Drag & Drop, Paste, or Click to Upload Image
        </div>
      )}

      {image && (
        <div className="w-full max-w-md mt-4 flex flex-col items-center">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full rounded-md shadow-md"
          />
          <button
            onClick={() => setImage(null)}
            className="mt-2 text-sm text-red-500 underline"
          >
            Remove Image
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={(e) => handleImage(e.target.files[0])}
      />

      {image && !processing && (
        <button
          onClick={handleUpload}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Analyze Image
        </button>
      )}

      {processing && (
        <p className="mt-6 text-blue-600 font-semibold animate-pulse">
          Processing your image...
        </p>
      )}
    </div>
  );
};

export default Upload;
