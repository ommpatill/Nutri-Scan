import React from "react";

const Loader = ({ text = "Processing..." }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <p className="text-blue-600 text-lg font-semibold animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
