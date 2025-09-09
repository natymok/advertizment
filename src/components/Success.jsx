import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    setMessage("🎉 User registered successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Centered container */}
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        <button
          onClick={handleRegister}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Success message */}
        {message && (
          <div className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg text-center w-full">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
