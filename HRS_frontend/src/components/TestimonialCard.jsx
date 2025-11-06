import React from "react";

// ⭐ Reusable function to render fractional stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <span key={i} className="text-amber-500 text-xl">
          ★
        </span>
      );
    } else if (i - rating < 1) {
      stars.push(
        <span key={i} className="text-amber-500 text-xl relative">
          <span
            className="absolute overflow-hidden"
            style={{ width: `${(rating % 1) * 100}%` }}
          >
            ★
          </span>
          <span className="text-gray-300">★</span>
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300 text-xl">
          ★
        </span>
      );
    }
  }
  return stars;
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl shadow-md h-full flex flex-col">
      <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
      <p className="text-gray-700 mb-4 italic flex-grow">
        "{testimonial.comment}"
      </p>
      <p className="font-bold text-gray-900">{testimonial.fullname}</p>
    </div>
  );
};

export default TestimonialCard;
