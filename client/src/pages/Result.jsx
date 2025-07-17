import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { result, confidence, image } = state || {};

  const imageUrl = image?.startsWith("data:") ? image : `/uploads/${image}`;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Prediction Result
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-2xl p-6">
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <span className="text-blue-600">Detected Deficiency:</span>{" "}
            <span className="text-xl text-blue-700 font-bold">{result}</span>
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-green-600 font-medium">Confidence Score:</span>{" "}
            <span className="font-semibold">{confidence}%</span>
          </p>
        </div>

        {imageUrl && (
          <div className="rounded-lg overflow-hidden border border-blue-100 shadow mb-6">
            <img
              src={imageUrl}
              alt="Image Processed Successfuly"
              className="w-full object-cover max-h-[400px]"
            />
          </div>
        )}


        <button
        type="button"
        onClick={() => navigate("/recommendation", { state: { result } })}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
        View Recommendation
        </button>



        {/* <button
          type="button"
          onClick={() => navigate("/recommendation")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          View Recommendation
        </button> */}
      </div>
    </div>
  );
};

export default Result;

