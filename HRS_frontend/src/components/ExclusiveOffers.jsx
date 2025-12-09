"use client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Clock,
  TrendingUp,
} from "lucide-react";
import axios from "axios";

export default function ExclusiveOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/room-category/offers`,
          { withCredentials: true }
        );
        if (res.data.success && Array.isArray(res.data.categories)) {
          setOffers(res.data.categories);
        } else {
          throw new Error("Failed to load offers");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching offers");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, offers.length - itemsPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Auto-slide
  useEffect(() => {
    if (offers.length > itemsPerView) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, offers.length, itemsPerView]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (offers.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <Header />

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden px-12">
            <div
              className="flex transition-transform duration-500 ease-out gap-6 p-2"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {offers.map((cat) => (
                <div
                  key={cat.room_category_id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerView}% - ${
                      ((itemsPerView - 1) * 24) / itemsPerView
                    }px)`,
                  }}
                >
                  <OfferCard category={cat} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {offers.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function OfferCard({ category }) {
  const hasDiscount = category.offer?.discountPercent > 0;
  const finalPrice = category.offer?.finalPrice || category.price_per_night;
  const originalPrice = category.price_per_night;

  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col border border-gray-100">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200">
        {category.category_images?.[0] && (
          <img
            src={category.category_images[0]}
            alt={category.category_name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{category.category_name}</h3>
        <p className="text-gray-600 mb-4 flex-1">
          {category.category_description ||
            "Enjoy a luxurious stay with exclusive amenities."}
        </p>
        <div className="flex items-baseline gap-3 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-amber-600">
              Rs. {finalPrice}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          {hasDiscount && (
            <div className="flex flex-col">
              <span className="text-lg text-gray-400 line-through">
                Rs. {originalPrice}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                Save Rs. {originalPrice - finalPrice}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() =>
            navigate(`/room-category/${category.room_category_id}`)
          }
          className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// Header Component
function Header() {
  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-4">
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
          <Sparkles size={20} />
          <span className="font-bold text-sm uppercase tracking-wide">
            Hot Deals
          </span>
        </div>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
        Exclusive{" "}
        <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          Offers
        </span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Don't miss out on these amazing deals! Book now and save big on your
        perfect getaway.
      </p>
    </div>
  );
}

// Loading Component
function Loading() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading exclusive offers...</p>
      </div>
    </section>
  );
}

// Error Component
function Error({ message }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-red-600">{message}</p>
      </div>
    </section>
  );
}
