"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard"; // ✅ Import the card

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/customer-testimonial"
        );
        if (!res.data.success) throw new Error("Failed to load testimonials");
        setTestimonials(res.data.testimonials);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // ✅ Responsive items per view
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

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // ✅ Auto-slide every 6 seconds
  useEffect(() => {
    if (testimonials.length > itemsPerView) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, testimonials, itemsPerView]);

  if (loading)
    return (
      <section className="py-20 px-4 bg-white">
        <p className="text-center text-gray-600">Loading testimonials...</p>
      </section>
    );

  if (error)
    return (
      <section className="py-20 px-4 bg-white">
        <p className="text-center text-red-600">{error}</p>
      </section>
    );

  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Guest Reviews
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what our guests have to say about their experience
        </p>

        {testimonials.length === 0 ? (
          <p className="text-center text-gray-600">No testimonials found.</p>
        ) : (
          <>
            <div className="relative px-12">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out gap-8"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / itemsPerView)
                    }%)`,
                  }}
                >
                  {testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / itemsPerView}% - ${
                          ((itemsPerView - 1) * 32) / itemsPerView
                        }px)`,
                      }}
                    >
                      {/* ✅ Use the separate card here */}
                      <TestimonialCard testimonial={t} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              {testimonials.length > itemsPerView && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition z-10"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition z-10"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Dots indicator */}
            {testimonials.length > itemsPerView && (
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
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
