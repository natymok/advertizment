import React from "react";

export default function LevelSelector({ onSelect }) {
  const levels = [
    { id: "M1", range: "3,000 - 20,000 birr" },
    { id: "M2", range: "20,000 - 60,000 birr" },
    { id: "M3", range: "60,000 - 100,000 birr" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onSelect(level.id)}
          className="p-4 bg-white shadow rounded-lg hover:bg-blue-500 hover:text-white transition text-center"
        >
          <h2 className="font-bold text-lg">{level.id}</h2>
          <p className="text-sm">{level.range}</p>
        </button>
      ))}
    </div>
  );
}
