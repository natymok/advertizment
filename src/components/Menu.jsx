import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaMoneyCheckAlt,
  FaUserPlus,
  FaBuilding,
  FaCreditCard,
} from "react-icons/fa";

export default function ActionMenu() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  // ✅ Load invite code once when component mounts
  useEffect(() => {
    const inviteCode = localStorage.getItem("invite_code") || "123456";
    setInviteLink(`${window.location.origin}/signup/${inviteCode}`);
  }, []);

  const menuItems = [
    { name: "Recharge", icon: <FaWallet />, path: "/recharge" },
    { name: "Withdraw", icon: <FaMoneyCheckAlt />, path: "/withdraw" },
    { name: "Invite Friends", icon: <FaUserPlus />, path: null },
    { name: "Company Profile", icon: <FaBuilding />, path: "/company-profile" },
    { name: "Add Bank Account", icon: <FaCreditCard />, path: "/bank" },
  ];

  const handleClick = (item) => {
    if (item.name === "Invite Friends") {
      setShowPopup(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md">
      {/* Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(item)}
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-yellow-600 hover:bg-black rounded-lg shadow-sm transition-all duration-200"
          >
            <span className="text-2xl mb-2 text-white">{item.icon}</span>
            <span className="font-medium text-sm sm:text-base text-white">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 sm:w-96 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-center mb-4">
              Invite Your Friends
            </h2>
            <p className="text-gray-700 text-center break-all bg-gray-100 p-2 rounded-md">
              {inviteLink || "Loading..."}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                alert("Link copied to clipboard!");
              }}
              disabled={!inviteLink}
              className="mt-4 w-full bg-yellow-600 hover:bg-black text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
