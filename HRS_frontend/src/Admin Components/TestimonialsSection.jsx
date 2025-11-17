"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Star } from "lucide-react";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all testimonials
  const loadTestimonials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/customer-testimonial",
        { withCredentials: true }
      );

      if (Array.isArray(res.data.testimonials)) {
        setTestimonials(res.data.testimonials);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await axios.delete(`http://localhost:3000/customer-testimonial/${id}`, {
        withCredentials: true,
      });
      loadTestimonials();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Customer Testimonials
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div className="flex justify-center">
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-gray-400">
            No testimonials found.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.testimonial_id}
              className="p-6 bg-white rounded-3xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300 ease-in-out relative"
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {t.fullname}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{t.comment}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium text-sm">
                  <Star size={16} /> {t.rating?.toFixed(1)}
                </div>

                <button
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  onClick={() => handleDelete(t.testimonial_id)}
                >
                  <Trash2 />
                </button>
              </div>

              {/* Decorative quote icon */}
              <svg
                className="absolute top-3 right-3 w-6 h-6 text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.17 6A5 5 0 0 0 2 11v5h5v-5a2 2 0 0 1 0-4h.17zm12 0A5 5 0 0 0 14 11v5h5v-5a2 2 0 0 1 0-4h.17z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
