import React from "react";
import { FaLock } from "react-icons/fa";

export default function LevelSelector({ onSelect }) {
  const levels = [
    { id: "L1", range: "3000 birr" },
    { id: "L2", range: "8000 birr" },
    { id: "L3", range: "25,500 birr" },
    { id: "L4", range: "58,000 birr" },
    { id: "L5", range: "135,000 birr" },
    { id: "L6", range: "210,000 birr" },
    { id: "L7", range: "550,000 birr" },
    { id: "L8", range: "950,000 birr" },
    { id: "L9", range: "1,350,000 birr" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {levels.map((level, index) => {
        const isLocked = index > 2;
        return (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            disabled={isLocked}
            className={`p-4 shadow rounded-lg text-center transition flex items-center justify-center gap-2 ${isLocked ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-blue-500 hover:text-white'}`}
          >
            <h2 className="font-bold text-lg">{level.id}</h2>
            <p className="text-sm">{level.range}</p>
            {isLocked && <FaLock className="text-gray-500" />}
          </button>
        );
      })}
    </div>
  );
}
