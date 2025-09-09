import React, { useState, useEffect } from "react";
import img1 from '../Images/202504221726484711494461.png';
import img2 from '../Images/img2.png';

export default function AdSlider() {
  const images = ['https://img.caixin.com/2018-03-08/1520496422485735.jpg', 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/11/13/11/nio-ep9.jpg?crop=8:5,smart&quality=75&auto=webp&width=960'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-60 overflow-hidden rounded-xl shadow-lg flex justify-center">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full sm:w-[80%] md:w-[65%] h-full object-cover rounded-xl transition-all duration-500"
      />
    </div>
  );
}
