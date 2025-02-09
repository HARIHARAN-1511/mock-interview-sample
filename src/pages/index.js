import React, { useState, useEffect } from "react";
import { Moon, Sun, ArrowLeft } from "lucide-react"; 

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-black to-gray-700 text-white" : "bg-gradient-to-br from-blue-100 to-white text-black"} min-h-screen w-full flex flex-col items-center justify-center p-6`}>      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow-lg"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-900" />}
      </button>

      {/* Back Button */}
      {isLoggedIn && (
        <button
          onClick={() => setIsLoggedIn(false)}
          className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-lg shadow-lg flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      )}

      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-full h-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-none md:rounded-2xl p-8 flex flex-col md:flex-row gap-6 overflow-hidden">
          {!isLoggedIn ? (
            <div className="w-full flex flex-col space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-center">Login</h2>
              <input type="text" placeholder="Enter your name" className="p-3 border rounded-lg bg-white dark:bg-gray-700 w-full" />
              <select className="p-3 border rounded-lg bg-white dark:bg-gray-700 w-full">
                <option>Select Domain</option>
                <option>Software Engineering</option>
                <option>Data Science</option>
                <option>Cybersecurity</option>
              </select>
              <input type="file" className="p-3 border rounded-lg bg-white dark:bg-gray-700 w-full" />
              <button onClick={() => setIsLoggedIn(true)} className="p-3 bg-blue-600 text-white rounded-lg w-full">Login</button>
            </div>
          ) : (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center border p-6 rounded-lg bg-gray-100 dark:bg-gray-700 w-full h-full">
                <span className="text-lg font-medium">Camera will be here</span>
              </div>
              <div className="flex items-center justify-center border p-6 rounded-lg bg-gray-100 dark:bg-gray-700 w-full h-full">
                <span className="text-lg font-medium">Chatbot will be here</span>
              </div>
              <div className="md:col-span-2 flex items-center justify-center border p-6 rounded-lg bg-gray-100 dark:bg-gray-700 w-full h-full">
                <span className="text-lg font-medium">Face Analysis will be here</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
