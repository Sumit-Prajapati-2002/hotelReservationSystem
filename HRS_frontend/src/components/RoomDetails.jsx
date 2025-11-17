import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoomDetails({ categoryId, onBack }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/room-category/${categoryId}`
        );
        const data = await response.json();

        if (data.success) {
          setCategory(data.category);
        } else {
          setError("Category not found");
        }
      } catch (err) {
        setError("Failed to fetch category data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const nextImage = () => {
    if (category?.category_images?.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % category.category_images.length
      );
    }
  };

  const prevImage = () => {
    if (category?.category_images?.length > 0) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + category.category_images.length) %
          category.category_images.length
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading category details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Rooms</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Carousel */}
          {category.category_images?.length > 0 && (
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={category.category_images[currentImageIndex]}
                alt={`${category.category_name} Image ${currentImageIndex + 1}`}
                key={`${category.category_images[currentImageIndex]}-${currentImageIndex}`}
                className="w-full h-full object-cover"
              />
              {category.category_images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg transition hover:bg-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg transition hover:bg-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Room Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {category.category_name}
            </h1>
            {category.category_description && (
              <p className="text-gray-700 mb-4">
                {category.category_description}
              </p>
            )}
          </div>

          {/* Amenities */}
          {category.amenities?.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.amenities.map((amenity, index) => (
                  <div
                    key={`${amenity.room_amenity_id}-${index}`} // unique key
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {amenity.room_amenity_name}
                    </h4>
                    {amenity.room_amenity_description && (
                      <p className="text-sm text-gray-600">
                        {amenity.room_amenity_description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24 space-y-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Price per night</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl font-bold text-amber-600">
                  Rs. {category.offer?.finalPrice || category.price_per_night}
                </span>
                {category.offer?.discountPercent > 0 && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {category.price_per_night}
                  </span>
                )}
              </div>
              {category.offer?.discountPercent > 0 && (
                <span className="inline-block mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {category.offer.discountPercent}% Today!
                </span>
              )}
            </div>

            <button
              onClick={() => navigate(`/room-category/${categoryId}/rooms`)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              Check Available Rooms
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Free cancellation up
                to 24 hours
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span> No prepayment needed
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Best price guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
