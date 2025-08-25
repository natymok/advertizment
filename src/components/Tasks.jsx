import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import Nav from "./Navbar"

const videos = [
  { id: 1, title: "Task Video 1", url: "https://www.youtube.com/embed/fzG406yPtDQ" },
  { id: 2, title: "Task Video 2", url: "https://www.youtube.com/embed/fzG406yPtDQ" },
  { id: 3, title: "Task Video 3", url: "https://www.youtube.com/embed/fzG406yPtDQ" }
];

export default function TasksPage() {
  const [playing, setPlaying] = useState({});
  const [doneEnabled, setDoneEnabled] = useState({});
  const [completed, setCompleted] = useState({});

  const handleWatch = (id, url) => {
    setPlaying(prev => ({ ...prev, [id]: url + "?autoplay=1" }));

    // Start 5-second timer only after user clicks Watch
    if (!doneEnabled[id]) {
      setTimeout(() => {
        setDoneEnabled(prev => ({ ...prev, [id]: true }));
      }, 5000); // 5 seconds
    }
  };

  const handleDone = id => {
    setCompleted(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:max-w-4xl mx-auto">
      {/* Available Tasks Section */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaTasks className="text-indigo-600 text-2xl" />
        <h1 className="text-3xl font-bold text-gray-800">Available Tasks</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={playing[video.id] || video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 flex justify-between items-center">
              <p className="font-semibold text-gray-700">{video.title}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleWatch(video.id, video.url)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Watch
                </button>
                <button
                  onClick={() => handleDone(video.id)}
                  disabled={!doneEnabled[video.id] || completed[video.id]}
                  className={`px-4 py-2 rounded font-medium transition ${
                    completed[video.id]
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : doneEnabled[video.id]
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {completed[video.id] ? "✅ Done" : "Mark Done"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Nav></Nav>
    </div>
  );
}
