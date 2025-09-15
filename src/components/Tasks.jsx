import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import Nav from "./Navbar";
import axiosinstance from "./Axios/Axios";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState({});      // store iframe src when playing
  const [doneEnabled, setDoneEnabled] = useState({});
  const [completed, setCompleted] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosinstance.get("/available/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
      } catch (err) {
        setStatusMessage("Failed to load tasks. Please refresh.");
        setStatusType("error");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Start video and enable "Mark Done" after 5s
  const handleWatch = (id, link) => {
    setPlaying((prev) => ({ ...prev, [id]: link + "?autoplay=1" }));
    if (!doneEnabled[id]) {
      setTimeout(() => {
        setDoneEnabled((prev) => ({ ...prev, [id]: true }));
      }, 20000);
    }
  };

  const handleDone = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmitTasks = async () => {
    setStatusMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axiosinstance.post(
        "/claim/task",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatusMessage(res.data?.message || "Tasks submitted successfully!");
      setStatusType("success");
    } catch (err) {
      const apiMsg =
        err.response?.data?.message || "Failed to submit tasks. Try again.";
      setStatusMessage(apiMsg);
      setStatusType("error");
    }
  };

  const allTasksDone =
    tasks.length > 0 && tasks.every((t) => completed[t._id || t.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-gray-300">Loading tasks…</p>
      </div>
    );
  }

  // 🎉 All tasks finished
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-500
                        text-white text-2xl md:text-3xl font-extrabold
                        px-8 py-6 rounded-2xl shadow-2xl text-center animate-pulse">
          🎉 You have finished <br className="hidden md:block" /> all your tasks!
        </div>
        <p className="mt-4 text-gray-300 text-lg">
          Great job! Come back later for new tasks.
        </p>
        <div className="mt-8 w-full max-w-sm">
          <Nav />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:max-w-4xl mx-auto text-white">
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaTasks className="text-cyan-400 text-2xl" />
        <h1 className="text-3xl font-bold">Available Tasks</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id || task.id}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            {/* Video Frame */}
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={playing[task._id || task.id] || ""}
                title={task.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-4 flex justify-between items-center">
              <p className="font-semibold">{task.title}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleWatch(task._id || task.id, task.link)}
                  className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
                >
                  Watch
                </button>
                <button
                  onClick={() => handleDone(task._id || task.id)}
                  disabled={
                    !doneEnabled[task._id || task.id] ||
                    completed[task._id || task.id]
                  }
                  className={`px-4 py-2 rounded font-medium transition ${
                    completed[task._id || task.id]
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : doneEnabled[task._id || task.id]
                      ? "bg-cyan-600 text-white hover:bg-cyan-700"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {completed[task._id || task.id] ? "✅ Done" : "Mark Done"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6 space-y-4">
        <button
          onClick={handleSubmitTasks}
          disabled={!allTasksDone}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            allTasksDone
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Tasks
        </button>

        {statusMessage && (
          <div
            className={`px-4 py-2 rounded-md text-center text-sm font-medium w-full md:w-1/2 ${
              statusType === "success"
                ? "bg-green-600 text-white shadow-xl"
                : "bg-red-600 text-white shadow-xl"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>

      <br />
      <Nav />
    </div>
  );
}
