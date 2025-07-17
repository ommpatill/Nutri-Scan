import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("token");
    navigate(isLoggedIn ? "/upload" : "/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-6 py-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
          Vitamin Deficiency Detection System
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-6">
          AI-powered tool to predict vitamin deficiencies through image analysis of your skin, nails, eyes, or tongue.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition"
        >
          Get Started
        </button>
      </div>

      {/* Info/Blog Section */}
      <div className="mt-16 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          How it Works
        </h2>
        <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 text-gray-700 leading-relaxed space-y-4">
          <p>
            Our system uses deep learning and computer vision techniques to analyze visible symptoms related to vitamin deficiencies. Simply upload a clear image of your tongue, nails, skin, or eyes — and let our model do the rest.
          </p>
          <ul className="list-disc list-inside text-blue-800">
            <li>Upload your image securely</li>
            <li>AI analyzes it for vitamin deficiency signs</li>
            <li>Receive a prediction with confidence score</li>
            <li>Get personalized recommendations instantly</li>
            <li>Download a full PDF report for reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
