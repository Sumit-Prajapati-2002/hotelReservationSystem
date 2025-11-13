"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RoomCategoryCard from "./RoomCategoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderDots from "./SliderDots";

export default function RoomCategory() {
  const [roomCategories, setRoomCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/room-category");
        if (!res.data.success) throw new Error("Failed to load categories");
        setRoomCategories(res.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;

  // ✅ Slider Navigation
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % roomCategories.length);

  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + roomCategories.length) % roomCategories.length
    );

  return (
    <section id="rooms" className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Rooms</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our carefully designed rooms, each offering unique comfort
          and style for your perfect stay.
        </p>

        {/* ✅ Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {roomCategories.map((room) => (
              <div
                key={room.room_category_id}
                className="flex-shrink-0 w-full px-4"
              >
                <RoomCategoryCard
                  id={room.room_category_id}
                  name={room.category_name}
                  description={room.category_description}
                  image={room.category_images?.[0]}
                  price={
                    room.offer ? room.offer.finalPrice : room.price_per_night
                  }
                  originalPrice={room.offer ? room.price_per_night : null}
                  discountPercent={room.offer?.discountPercent}
                />
              </div>
            ))}
          </div>

          {/* ✅ Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* ✅ Slider Dots */}
          <div className="mt-6">
            <SliderDots
              totalSlides={roomCategories.length}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
