import React from "react";
import { FaWallet, FaMoneyCheckAlt, FaUserPlus, FaBuilding } from "react-icons/fa";

export default function ActionMenu() {
  const menuItems = [
    { name: "Recharge", icon: <FaWallet /> },
    { name: "Withdraw", icon: <FaMoneyCheckAlt /> },
    { name: "Invite Friends", icon: <FaUserPlus /> },
    { name: "Company Profile", icon: <FaBuilding /> },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-around items-center gap-4 ">
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          className="flex flex-col items-center justify-center p-3 sm:p-4 bg-yellow-600 hover:bg-gray-100 rounded-lg shadow-sm transition-all duration-200 w-full sm:w-auto"
        >
          <span className="text-silver text-2xl mb-2 text-white">{item.icon}</span>
          <span className=" font-medium text-sm sm:text-base text-white">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
