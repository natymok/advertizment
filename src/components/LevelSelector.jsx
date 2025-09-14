import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import axiosinstance from "./Axios/Axios";
import { useNavigate } from "react-router-dom";
const levels = [
  { id: "L1", range: 3000 },
  { id: "L2", range: 8000 },
  { id: "L3", range: 25500 },
  { id: "L4", range: 58000 },
  { id: "L5", range: 135000 },
  { id: "L6", range: 210000 },
  { id: "L7", range: 550000 },
  { id: "L8", range: 950000 },
  { id: "L9", range: 1350000 },
];

export default function LevelSelector() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [refNumber, setRefNumber] = useState("");
  const [message, setMessage] = useState(""); // success
  const [error, setError] = useState("");     // error
  
  const [loading, setLoading] = useState(false);

  const handleSubmit =async (e,amount) => {
    if (!refNumber.trim()) {
      setError("error");
      return;
    }
     e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosinstance.post("/user/deposit",  {
      amount: amount,          // single value
      referenceNO: refNumber, // another single value
      level: selectedLevel.id, // another field
    }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setMessage(res.data.message || "✅ Deposited successfully!");
        setError("");
        setTimeout(() => {
            navigate('/deposits')
           setLoading(false);
            setMessage("");
       
        }, 2000);
      } else {
        setError(res.data.error || "Something went wrong");
        setLoading(false);
        setMessage("");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
       setLoading(false);
      setError(err.response?.data?.error || "Server error occurred");
      setMessage("");
      setTimeout(() => setError(""), 3000);
    }

    
    

   
   
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
        Select Your Level
      </h1>

      {/* Levels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {levels.map((level, index) => {
          const isUnlocked = index < 4; // First 4 are unlocked
          return (
            <motion.div
              key={level.id}
              whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
              whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
              className={`relative flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
                isUnlocked
                  ? "bg-white hover:shadow-2xl"
                  : "bg-gray-300 opacity-70 cursor-not-allowed"
              }`}
              onClick={() => isUnlocked && setSelectedLevel(level)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{level.id}</h2>
              <p className="text-gray-600">{level.range}</p>
              {isUnlocked ? (
                <FaCheckCircle className="text-green-500 text-2xl mt-2" />
              ) : (
                <FaLock className="text-gray-600 text-2xl mt-2" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl w-11/12 max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedLevel(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedLevel.id}
              </h2>
              <p className="text-gray-600 mb-4">
                Amount:{" "}
                <span className="font-semibold">{selectedLevel.range}</span>
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Reference
              </label>
              <input
                type="text"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                placeholder="Enter reference number"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-500"
              />

              {/* Success / Error Messages */}
              <AnimatePresence>
                {message  && (
                  <motion.p
                    className="text-green-600 font-semibold mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ✅ {message}
                  </motion.p>
                )}
                {error && (
                  <motion.p
                    className="text-red-600 font-semibold mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ❌ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                onClick={(e) => handleSubmit(e,selectedLevel.range)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
                } text-white font-bold py-3 rounded-xl shadow-lg transition-all`}
              >
                {loading ? "Submitting..." : "Submit"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
