import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [darkMode, setDarkMode] = useState(
  //   localStorage.getItem("theme") === "dark"
  // );

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);

  const [darkMode, setDarkMode] = useState(() => {
      return JSON.parse(localStorage.getItem("darkMode")) || false;
    });
  
    useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);
  
    

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between">
      <Link to="/" className="text-xl font-bold">🎬 Movie App</Link>
      <div>
        <Link to="/" className="mr-4 hover:text-blue-400">Home</Link>
        <Link to="/watchlist" className="mr-4 hover:text-blue-400">Watchlist</Link>
        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-700 px-4 py-2 rounded">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
