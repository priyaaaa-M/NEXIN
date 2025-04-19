import React, { useState, useEffect } from 'react';

const images = [
  {
    url: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Figma UI Design Tools",
    description: "Powerful design tools to create your engineering projects"
  },
  {
    url: "https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Student Dashboard",
    description: "Track all your academic progress in one place"
  },
  {
    url: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Finance Tracking",
    description: "Manage your student budget and expenses"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-skyblue-400 to-sunny-400 bg-clip-text text-transparent">
            See It In Action
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Take a peek at some of the powerful features that await you.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-4xl mx-auto h-[400px] md:h-[500px]">
        {/* Carousel Images */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-gray-200">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-electric-400 w-6' : 'bg-gray-400/50'
                }`}
            />
          ))}
        </div>

        {/* Left/Right arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-midnight-500/70 rounded-full p-2 hover:bg-midnight-400 transition-colors"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-midnight-500/70 rounded-full p-2 hover:bg-midnight-400 transition-colors"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;