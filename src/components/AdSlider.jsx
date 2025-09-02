import React, { useState, useEffect } from "react";
import img1 from '../Images/202504221726484711494461.png';
import img2 from '../Images/img2.png';

export default function AdSlider() {
  const images = [img1, img2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg flex justify-center">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full sm:w-[80%] md:w-[65%] h-full object-cover rounded-xl transition-all duration-500"
      />
    </div>
  );
}
