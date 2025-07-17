import React from "react";

const Header = ({ title }) => {
  return (
    <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
      {title}
    </h2>
  );
};

export default Header;
