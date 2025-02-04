import React, { useState, useEffect } from "react";
import { Moon, Sun, ArrowLeft } from "lucide-react"; // Added ArrowLeft icon

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen flex flex-col`}>
      
      {/* 🔄 Dark Mode Toggle Button (Top-Right) */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow-lg"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-900" />}
      </button>

      {/* 🔙 Back Button (Top-Left) - Only Shows When Logged In */}
      {isLoggedIn && (
        <button
          onClick={() => setIsLoggedIn(false)}
          className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-lg shadow-lg flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      )}

      {/* 🔳 Full-Screen Content */}
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className={`w-full h-[90vh] ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} grid grid-rows-[auto,1fr] border shadow-lg rounded-xl p-6`}>

          {/* 🏆 Header Section */}
          <h1 className="text-4xl font-extrabold text-center p-4">Welcome to AI Mock Interview</h1>

          {/* 📌 Main Content - Camera & Chatbot */}
          <div className="grid grid-cols-2 gap-4 flex-1 p-4">
            
            {/* 🎥 Left: Camera */}
            <div className="flex flex-col space-y-4 p-4 border-r">
              {isLoggedIn ? (
                <div className="flex-1 flex items-center justify-center border h-full bg-white dark:bg-gray-800 rounded-lg">
                  <span>Camera will be here</span>
                </div>
              ) : null}
            </div>

            {/* 🤖 Right: Chatbot/Login */}
            <div className="flex flex-col space-y-4 p-4">
              {!isLoggedIn ? (
                <>
                  <h2 className="text-2xl font-semibold">Login</h2>
                  <input type="text" placeholder="Enter your name" className="p-2 border rounded-lg bg-white dark:bg-gray-800" />
                  <select className="p-2 border rounded-lg bg-white dark:bg-gray-800">
                    <option>Select Domain</option>
                    <option>Software Engineering</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                  </select>
                  <input type="file" className="p-2 border rounded-lg bg-white dark:bg-gray-800" />
                  <button onClick={() => setIsLoggedIn(true)} className="p-2 bg-blue-600 text-white rounded-lg">Login</button>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center border h-full bg-white dark:bg-gray-800 rounded-lg">
                  <span>Chatbot will be here</span>
                </div>
              )}
            </div>
          </div>

          {/* 🧑‍💻 Face Analysis Section */}
          {isLoggedIn && (
            <div className="w-full p-4 border-t">
              <div className="flex items-center justify-center border h-32 bg-white dark:bg-gray-800 rounded-lg">
                <span>Face Analysis will be here</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
