import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Your Prediction History
      </h2>

      {loading ? (
        <p className="text-center text-blue-500 animate-pulse">
          Loading your history...
        </p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">No prediction records found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {history.map((record, idx) => (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-200 p-5 rounded-xl shadow-sm flex flex-col md:flex-row gap-6"
            >
              {record.image && (
                <div className="flex-shrink-0 w-full md:w-48">
                  <img
                    src={record.image}
                    alt="History Upload"
                    className="rounded-md w-full object-cover max-h-48"
                  />
                </div>
              )}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-lg">
                    <strong>Deficiency:</strong>{" "}
                    <span className="text-blue-700 font-semibold">
                      {record.deficiency}
                    </span>
                  </p>
                  <p>
                    <strong>Confidence:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {parseFloat(record.confidence).toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(record.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 md:self-end">
                  <button
                    onClick={() =>
                      window.open(`/api/pdf/${record._id}`, "_blank")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
