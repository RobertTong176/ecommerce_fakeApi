import React, { useState, useEffect } from "react";

const slideImg = [
  {
    id: "1",
    image: "https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi",
  },
  {
    id: "2",
    image: "https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi",
  },
  {
    id: "3",
    image: "https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi",
  },
  {
    id: "4",
    image: "https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImg.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [slideImg.length]);

  return (
    <div id="default-carousel" className="relative w-full">
      {slideImg.map((product, index) => (
        <div
          key={product.id}
          className={`relative h-60 overflow-hidden rounded-lg md:h-60 duration-700 ease-in-out ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img
            src={product.image}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
            alt={product.title}
          />
        </div>
      ))}

      {/* Carousel Navigation Dots */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slideImg.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + slideImg.length) % slideImg.length
          )
        }
      >
        <span className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          &lt;
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={() => setCurrentIndex((currentIndex + 1) % slideImg.length)}
      >
        <span className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          &gt;
        </span>
      </button>
    </div>
  );
}
