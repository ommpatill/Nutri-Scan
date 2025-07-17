import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react"; // Icons for toggle

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors">
      {/* Left: Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400 tracking-wide">
        NutriScan
      </Link>

      {/* Right: Navigation */}
      <div className="flex items-center gap-4 text-blue-600 dark:text-blue-200 font-medium text-sm">
        {!token ? (
          <>
            <Link to="/" className="hover:text-blue-800 dark:hover:text-white transition">
              Home
            </Link>
            <Link to="/faq" className="hover:text-blue-800 dark:hover:text-white transition">
              FAQ
            </Link>
            <Link
              to="/login"
              className="px-4 py-1 border border-blue-600 dark:border-blue-300 rounded hover:bg-blue-50 dark:hover:bg-blue-800 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/upload" className="hover:text-blue-800 dark:hover:text-white transition">
              Upload
            </Link>
            {/* <Link to="/history" className="hover:text-blue-800 dark:hover:text-white transition">
              History
            </Link> */}
            <Link to="/recommendation" className="hover:text-blue-800 dark:hover:text-white transition">
              Recommendations
            </Link>
            <Link to="/profile" className="hover:text-blue-800 dark:hover:text-white transition">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {/* 🌙 Toggle Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//       {/* Left: Brand */}
//       <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
//         NutriScan
//       </Link>

//       {/* Right: Navigation */}
//       <div className="flex items-center gap-6 text-blue-600 font-medium text-sm">
//         {!token ? (
//           <>
//             <Link
//               to="/"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               Home
//             </Link>
//             <Link
//               to="/faq"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               FAQ
//             </Link>
//             <Link
//               to="/login"
//               className="px-4 py-1 border border-blue-600 rounded hover:bg-blue-50"
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Sign Up
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/upload"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               Upload
//             </Link>
//             <Link
//               to="/history"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               History
//             </Link>
//             <Link
//               to="/recommendation"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               Recommendations
//             </Link>
//             <Link
//               to="/profile"
//               className="hover:text-blue-800 transition duration-200"
//             >
//               Profile
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
