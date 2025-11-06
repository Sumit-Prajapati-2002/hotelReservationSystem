export default function RoomCard({
  name,
  image,
  price,
  originalPrice,
  discountPercent,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-full flex flex-col">
      <div className="h-64 relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
        />

        {/* ✅ Price & Offer Display */}
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-1">
          {discountPercent ? (
            <>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold shadow-md">
                Rs. {price} / night
              </span>
              <span className="text-sm text-gray-200 line-through">
                Rs. {originalPrice}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                -{discountPercent}% OFF
              </span>
            </>
          ) : (
            <span className="bg-amber-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
              Rs. {price} / night
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition">
          View Details
        </button>
      </div>
    </div>
  );
}
