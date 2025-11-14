"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";

export default function BookingDetails() {
  const { bookingId } = useParams(); // ✅ match param name
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:3000/booking";

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/${bookingId}`, {
          withCredentials: true,
        });
        setBooking(res.data.booking);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch booking details");
        navigate("/admin-dashboard"); // optional redirect
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  if (loading) return <p>Loading booking details...</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-1"
      >
        <X size={18} /> Back
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Booking Details - #{booking.booking_id}
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <p>
          <span className="font-semibold">Check-In:</span>{" "}
          {booking.checkIn_date}
        </p>
        <p>
          <span className="font-semibold">Check-Out:</span>{" "}
          {booking.checkOut_date}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {booking.status}
        </p>
        <p>
          <span className="font-semibold">Total Price:</span>{" "}
          {booking.total_price}
        </p>
        <p>
          <span className="font-semibold">Number of Guests:</span>{" "}
          {booking.num_guest}
        </p>

        <h3 className="font-semibold mt-4">Customer Info</h3>
        <p>
          {booking.customer_firstname} {booking.customer_lastname} (
          {booking.customer_email})
        </p>

        <h3 className="font-semibold mt-4">Rooms</h3>
        <ul className="ml-4 list-disc">
          {booking.details.map((room) => (
            <li key={room.room_id}>
              <span className="font-semibold">{room.category_name}</span> -{" "}
              Price per night: {room.price_per_night} - Capacity:{" "}
              {room.capacity}
              {room.offer_title && (
                <span>
                  {" "}
                  - Offer: {room.offer_title} ({room.discount_percent}% off)
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
