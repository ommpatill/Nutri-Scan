import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle = "fixed bottom-6 right-6 px-5 py-3 rounded-md shadow-lg text-white text-sm font-medium transition-opacity duration-500 z-50";
  const bgStyle = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`${baseStyle} ${bgStyle}`}>
      {message}
      <button
        onClick={onClose}
        className="ml-4 font-bold text-white hover:opacity-80"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
