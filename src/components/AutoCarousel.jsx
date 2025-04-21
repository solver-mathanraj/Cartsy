import React, { useEffect, useState } from "react";
import "../css/AutoCarousel.css";

const AutoCarousel = () => {
  const images = [
    "src/assets/images/banners/banner_1.webp",
    "src/assets/images/banners/banner_2.png",
    "src/assets/images/banners/banner_3.png",
    "src/assets/images/banners/banner_4.png",
    "src/assets/images/banners/banner_5.png",
    "src/assets/images/banners/banner_6.webp",
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;
