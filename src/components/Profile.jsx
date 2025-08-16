import React, { useState, useRef, useEffect } from "react";
import { FaSignOutAlt, FaHistory, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ProfileMenu({ onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const SignOut=()=>{
    navigate('/signin')
  }

  return (
    <div className="relative w-full flex justify-end z-10" ref={menuRef}>
      {/* Profile Circle (Avatar) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden border-2 border-gray-400 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* You can replace this with <img src="profile.jpg" alt="profile" /> */}
        <span className="text-sm font-semibold text-black">ME</span>
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 animate-fade-in">
          <ul className="py-2 text-gray-700">
            <li>
              <a
                href="/withdraw"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <FaMoneyBillWave className="mr-2 text-green-600" />
                Withdraw
              </a>
            </li>
            <li>
              <a
                href="/transactions"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <FaHistory className="mr-2 text-blue-600" />
                Transaction History
              </a>
            </li>
            <li>
              <button
                onClick={SignOut}
                className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 text-red-600" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
