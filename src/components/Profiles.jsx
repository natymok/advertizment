import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosinstance from "./Axios/Axios";
import {
  FaWallet,
  FaSignOutAlt,
  FaExchangeAlt,
  FaArrowUp,
  FaUniversity,
} from "react-icons/fa";
export default function WalletDashboard() {
  const [user, setUser] = useState(null);
   const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch single user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }
        const res = await axiosinstance.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Backend returns a single user object

        setUser(res.data);
        console.log(user)
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          👋 Welcome Back
        </h1>
        <motion.button
          onClick={handleSignOut}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600"
        >
          <FaSignOutAlt /> Sign Out
        </motion.button>
      </div>

      {/* User Card */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading user data...</p>
      ) : user ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">{user.users.name}</h2>
            <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
              {user.level}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaWallet className="text-2xl text-green-500" />
            <p className="text-gray-700 font-semibold text-lg">{user.users.balance} Birr</p>
          </div>
          

          {user.banks ? (
            <div className="flex items-center gap-3">
              <FaUniversity className="text-2xl text-indigo-500" />
              <p className="text-gray-700 font-medium text-sm">
                {user.bankName} - {user.banks.account}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No bank linked</p>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No user found</p>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/transaction")}
          className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
        >
          <FaExchangeAlt className="text-2xl text-blue-500 mb-2" />
          <span className="font-medium text-gray-700">Transactions</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/withdraw")}
          className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
        >
          <FaArrowUp className="text-2xl text-red-500 mb-2" />
          <span className="font-medium text-gray-700">Withdraw</span>
        </motion.button>
      </div>
    </div>
  );
}
