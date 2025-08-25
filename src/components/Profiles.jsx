import React from 'react';
import { FaPhone, FaWallet, FaArrowUp, FaArrowDown, FaFileInvoice, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col gap-6 md:max-w-2xl mx-auto">
      {/* Account Info */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-3">
          <FaPhone className="h-6 w-6 text-gray-500" />
          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-semibold text-gray-900">+251 912 345 678</p>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <FaWallet className="h-6 w-6 text-gray-500" />
          <div>
            <p className="text-gray-500 text-sm">Balance</p>
            <p className="font-semibold text-gray-900">ETB 12,500</p>
          </div>
        </div>

        {/* Recharge and Withdraw Buttons */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FaArrowDown /> Recharge
          </button>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            <FaArrowUp /> Withdraw
          </button>
        </div>
      </div>

      {/* Financial Records */}
      <button
        onClick={() => navigate('/transactions')}
        className="bg-white shadow rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50"
      >
        <FaFileInvoice className="h-6 w-6 text-gray-500" />
        <span className="font-semibold text-gray-900">Financial Records</span>
      </button>

      {/* Sign Out */}
      <button
        onClick={() => navigate('/signin')}
        className="bg-white shadow rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50"
      >
        <FaSignOutAlt className="h-6 w-6 text-gray-500" />
        <span className="font-semibold text-gray-900">Sign Out</span>
      </button>
      <Navbar></Navbar>
    </div>
  );
}
