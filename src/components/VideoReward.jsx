import React, { useState } from "react";
import { useStateValue } from '../Context/StateProvider';
import ErrorMessage from "./Error";
export default function VideoReward({ onReward }) {

     const [{ balance }, dispatch] = useStateValue();
  const videos = [
    { id: 1, title: "Video 1" },
    { id: 2, title: "Video 2" },
    { id: 3, title: "Video 3" },
  ];

  const [watched, setWatched] = useState([]);
  const [error,setError]=useState('')

  const markWatched = (id) => {
    if (!watched.includes(id)) {
      setWatched((prev) => [...prev, id]);
    }
  };

  const claimReward = () => {
    console.log(balance)
       if(balance){
        
       }
       else{
           setError(' please join first ')
           setTimeout(()=>{
             setError('')
           },2000)
           
       }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
        {error &&(
               <ErrorMessage message={error}></ErrorMessage>
             )}
      <h2 className="font-bold mb-4 text-lg">Daily Reward Videos</h2>
        {balance && (
             <div className="space-y-3 mb-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded ${
              watched.includes(video.id) ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span className="mb-2 sm:mb-0">{video.title}</span>
            <button
              onClick={() => markWatched(video.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Mark Watched
            </button>
           
          </div>
        ))}
      </div>
        )}
      <button
        
        onClick={claimReward}
        className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded"
      >
        Tasks
      </button>
    </div>
  );
}
