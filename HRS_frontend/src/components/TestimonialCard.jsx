export default function TestimonialCard({ testimonial }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-amber-500 text-2xl drop-shadow-md">
            ★
          </span>
        );
      } else if (i - rating < 1) {
        stars.push(
          <span key={i} className="text-amber-500 text-2xl relative">
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
          <span key={i} className="text-gray-300 text-2xl">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-amber-200 transform hover:-translate-y-1">
      {/* Stars */}
      <div className="flex mb-5">{renderStars(testimonial.rating)}</div>

      {/* Comment */}
      <p className="text-gray-700 mb-6 italic flex-grow text-lg leading-relaxed">
        "{testimonial.comment}"
      </p>

      {/* User Info */}
      <div className="flex items-center mt-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg mr-3">
          {testimonial.fullname.charAt(0)}
        </div>
        <p className="font-bold text-gray-900 text-lg">
          {testimonial.fullname}
        </p>
      </div>
    </div>
  );
}
