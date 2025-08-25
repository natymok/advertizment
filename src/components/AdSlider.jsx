import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
export default function AdSlider() {
  const images = Array(8).fill(
    "https://i0.wp.com/iamelectric.eu/wp-content/uploads/2019/11/skuter-elektryczny-iamelectric-havana_red_1-kopia.png?fit=800%2C800&ssl=1"
  );

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const containerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && itemRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = itemRef.current.getBoundingClientRect().width + 16; // 16px gap from space-x-4
      const totalWidth = images.length * itemWidth;

      const visibleItems = Math.floor(containerWidth / itemWidth);
      const minOffset = -(totalWidth - visibleItems * itemWidth);

      setMaxOffset(minOffset >= 0 ? 0 : minOffset);
    }
  }, [images.length]);

  const handleScroll = (direction) => {
    if (!itemRef.current) return;

    const itemWidth = itemRef.current.getBoundingClientRect().width + 16;
    setOffset((prev) => {
      let newOffset =
        direction === "left" ? prev + itemWidth : prev - itemWidth;

      if (newOffset > 0) newOffset = 0; // stop at start
      if (newOffset < maxOffset) newOffset = maxOffset; // stop at end

      return newOffset;
    });
  };

  return (
    <div className="relative overflow-hidden  w-full py-4" ref={containerRef}>
   

      {/* Left Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* Images */}
      <motion.div
        className="flex space-x-4"
        animate={{ x: offset }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            ref={i === 0 ? itemRef : null} // measure only first item
            className="w-64 sm:w-72 md:w-80 h-30 sm:h-48 flex-shrink-0 rounded-lg shadow bg-gray-200"
          >
            <img
              src={src}
              alt={`Ad ${i + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </motion.div>

      {/* Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
