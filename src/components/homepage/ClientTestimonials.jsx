import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import image1 from '/src/assets/testimonials/1.svg';
import image2 from '/src/assets/testimonials/2.svg';
import image3 from '/src/assets/testimonials/3.svg';
import image4 from '/src/assets/testimonials/4.svg';
import image5 from '/src/assets/testimonials/5.svg';

const testimonials = [
    { id: 1, imageUrl: image1, altText: 'Review 1' },
    { id: 2, imageUrl: image2, altText: 'Review 2' },
    { id: 3, imageUrl: image3, altText: 'Review 3' },
    { id: 4, imageUrl: image4, altText: 'Review 4' },
    { id: 5, imageUrl: image5, altText: 'Review 5' },
  ];

export const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <img
          src={testimonials[currentIndex].imageUrl}
          alt={testimonials[currentIndex].altText}
          className="absolute top-0 left-0 object-cover w-full h-full rounded-lg shadow-md"
        />
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-[#B87333] focus:outline-none"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-[#B87333] focus:outline-none"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

