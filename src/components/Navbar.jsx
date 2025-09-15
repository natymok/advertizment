import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaTrophy, FaUser } from "react-icons/fa";

/**
 * Bottom Navigation Bar with routing
 * - Fixed at the bottom of the page
 * - Uses Tailwind + react-icons + react-router-dom
 */

const navItems = [
  { id: "home", label: "Home", icon: <FaHome className="h-5 w-5" />, path: "/dashboard" },
  { id: "tasks", label: "Tasks", icon: <FaTasks className="h-5 w-5" />, path: "/tasks" },
  { id: "level", label: "About Nio", icon: <FaTrophy className="h-5 w-5" />, path: "/about" },
  { id: "profile", label: "Profile", icon: <FaUser className="h-5 w-5" />, path: "/profile" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNav({ activePage }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
      {navItems.map(({ id, label, icon, path }) => {
        const isActive = activePage === id;
        return (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={classNames(
              "flex flex-col items-center text-xs",
              isActive ? "text-gray-900" : "text-gray-500"
            )}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
