"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Testimonial {
  fullname: string;
  comment: string;
  rating: number;
}

interface TestimonialResponse {
  success: boolean;
  testimonials: Testimonial[];
}

// Function to render stars (supports fractional stars)
const renderStars = (rating: number) => {
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

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get<TestimonialResponse>(
          "http://localhost:3000/customer-testimonial"
        );
        if (!res.data.success) throw new Error("Failed to load testimonials");
        setTestimonials(res.data.testimonials);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return <p className="text-center">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Guest Reviews
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what our guests have to say about their experience
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <p className="text-center col-span-3 text-gray-600">
              No testimonials found.
            </p>
          ) : (
            testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl shadow-md"
              >
                <div className="flex mb-4">{renderStars(t.rating)}</div>
                <p className="text-gray-700 mb-4 italic">"{t.comment}"</p>
                <p className="font-bold text-gray-900">{t.fullname}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
