"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AmenityCard from "./AmenityCard";

export default function HotelAmenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch amenities from API
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/hotel-amenity`);
        if (!res.data.success) throw new Error("Failed to load amenities");
        setAmenities(res.data.amenities);
      } catch (err) {
        setError(
          err.message || "Something went wrong while fetching amenities"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAmenities();
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

  const maxIndex = Math.max(0, amenities.length - itemsPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Auto-slide
  useEffect(() => {
    if (amenities.length > itemsPerView) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, amenities.length, itemsPerView]);

  if (loading)
    return <div className="text-center py-10">Loading amenities...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section
      id="amenities"
      className="py-20 px-4 bg-gradient-to-br from-teal-50 to-cyan-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Hotel Amenities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a memorable and comfortable stay
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden px-12">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {amenities.map((amenity) => (
                <div
                  key={amenity.hotel_amenity_id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerView}% - ${
                      ((itemsPerView - 1) * 24) / itemsPerView
                    }px)`,
                  }}
                >
                  <AmenityCard
                    name={amenity.hotel_amenity_name}
                    image={amenity.hotel_amenity_image}
                    desc={amenity.hotel_amenity_description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {amenities.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {amenities.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-amber-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
