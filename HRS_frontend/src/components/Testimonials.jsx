"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import SliderControls from "./SliderControls";
import SliderDots from "./SliderDots";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Fetch testimonials from API
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

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Auto-slide
  useEffect(() => {
    if (testimonials.length > itemsPerView) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, itemsPerView, testimonials.length]);

  if (loading)
    return <p className="text-center py-20">Loading testimonials...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Guest Reviews
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what our guests have to say about their experience
        </p>

        <div className="relative px-4 md:px-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-8 p-4"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                <div
                  key={slideIdx}
                  className="flex-shrink-0 w-full grid gap-8"
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                  }}
                >
                  {testimonials
                    .slice(
                      slideIdx * itemsPerView,
                      (slideIdx + 1) * itemsPerView
                    )
                    .map((t, idx) => (
                      <TestimonialCard
                        key={slideIdx * itemsPerView + idx}
                        testimonial={t}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > itemsPerView && (
            <SliderControls prevSlide={prevSlide} nextSlide={nextSlide} />
          )}
        </div>

        {testimonials.length > itemsPerView && (
          <SliderDots
            totalSlides={totalSlides}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </section>
  );
}
