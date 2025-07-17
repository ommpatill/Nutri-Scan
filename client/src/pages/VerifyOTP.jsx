import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/axios";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      if (res.data.success) {
        setMessage("OTP verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Email Verification
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          An OTP has been sent to{" "}
          <span className="font-medium text-blue-600">{email}</span>. <br />
          Please enter it below to verify your email.
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-center focus:ring-2 focus:ring-blue-300 outline-none"
        />

        {message && (
          <p className="text-green-600 text-sm font-medium mb-3">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
