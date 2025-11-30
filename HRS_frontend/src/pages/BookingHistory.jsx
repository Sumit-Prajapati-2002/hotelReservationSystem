"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Users, Loader2, BookmarkCheck, Star, X } from "lucide-react";
import Navbar from "../components/Navbar";

export default function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch booking history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/booking-history`, {
          withCredentials: true,
        });

        if (res.data.success && Array.isArray(res.data.summary)) {
          setHistory(res.data.summary);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Open modal
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setComment("");
    setRating(0);
    setShowModal(true);
  };

  // Submit review
  // Submit review
  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/customer-testimonial`,
        {
          rating,
          comment,
        },
        { withCredentials: true }
      );

      alert("Testimonial submitted successfully!");
      setShowModal(false);
    } catch (err) {
      alert("Failed to submit testimonial");
      console.log(err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Push content below navbar */}
      <div className="pt-24 pb-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          Booking History
        </h1>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
          </div>
        )}

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {!loading && history.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No booking history found.
          </p>
        )}

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((item) => (
            <div
              key={item.booking_id}
              className="border border-orange-200 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition duration-200"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <BookmarkCheck className="text-orange-600" />
                <h2 className="text-xl font-bold text-orange-700">
                  Booking #{item.booking_id}
                </h2>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="text-orange-500" />
                <p>
                  {item.checkIn_date} → {item.checkOut_date}
                </p>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <Users className="text-orange-500" />
                <p>{item.num_guest} guest(s)</p>
              </div>

              {/* Status */}
              <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
                {item.status}
              </span>

              {/* Price */}
              <div className="mt-5 text-right font-bold text-orange-700 text-lg">
                Rs. {item.total_price}
              </div>

              {/* Rate & Review Button (only if completed) */}
              {item.status === "completed" && (
                <button
                  onClick={() => openModal(item)}
                  className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Rate & Review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-600"
            >
              <X size={26} />
            </button>

            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Rate Your Stay
            </h2>

            {/* Rating Stars */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={32}
                  className={`cursor-pointer ${
                    rating >= num ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              rows="4"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={submitReview}
              className="mt-4 w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </>
  );
}
