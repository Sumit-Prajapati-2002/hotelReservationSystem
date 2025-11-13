import { useNavigate } from "react-router-dom";

export default function RoomCategoryCard({
  id,
  name,
  image,
  price,
  originalPrice,
  discountPercent,
  description,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col group">
      {/* Image Section */}
      <div className="h-72 relative overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Price & Discount */}
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
          {discountPercent ? (
            <>
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm">
                Rs. {price} / night
              </span>
              <span className="text-sm text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full line-through">
                Rs. {originalPrice}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                -{discountPercent}% OFF
              </span>
            </>
          ) : (
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg backdrop-blur-sm">
              Rs. {price} / night
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 mb-6 flex-1 leading-relaxed">{description}</p>

        <button
          onClick={() => navigate(`/room-category/${id}`)}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
