import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    if (autoScroll) {
      const intervalId = setInterval(() => {
        handleNext();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [autoScroll, images.length]);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleIndicatorClick = (index: number) => {
    setAutoScroll(false);
    setCurrentIndex(index + 1);
  };

  const resetAutoScroll = () => {
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 7000);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex === 0) {
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + 1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div
        className={`flex transition-transform ${
          isTransitioning ? "duration-500 ease-in-out" : "duration-0"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => {
          handlePrev();
          resetAutoScroll();
        }}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => {
          handleNext();
          resetAutoScroll();
        }}
      >
        &#10095;
      </button>

      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 my-4 rounded-full ${
              index + 1 === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => {
              handleIndicatorClick(index);
              resetAutoScroll();
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
