import { useState, useEffect } from "react";
import { Edit2, Trash2, Check, X, Eye } from "lucide-react"; // import Eye icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const BASE_URL = "http://localhost:3000/booking";
  const navigate = useNavigate(); // navigation

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      setBookings(Array.isArray(res.data.bookings) ? res.data.bookings : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      setBookings(bookings.filter((b) => b.booking_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  const handleEditSave = async () => {
    if (!editingBooking) return;
    try {
      const payload = {
        checkIn_date: editingBooking.checkIn_date,
        checkOut_date: editingBooking.checkOut_date,
        total_price: editingBooking.total_price,
        customer_email: editingBooking.customer_email,
      };
      const res = await axios.put(
        `${BASE_URL}/${editingBooking.booking_id}`,
        payload,
        { withCredentials: true }
      );

      setBookings(
        bookings.map((b) =>
          b.booking_id === editingBooking.booking_id
            ? { ...b, ...res.data.booking }
            : b
        )
      );
      setEditingBooking(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update booking");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-start transition-transform hover:scale-105"
            >
              <div className="w-full">
                <p className="text-gray-700">
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {booking.booking_id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Check-In:</span>{" "}
                  {booking.checkIn_date}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Check-Out:</span>{" "}
                  {booking.checkOut_date}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total Price:</span>{" "}
                  {booking.total_price}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Customer Email:</span>{" "}
                  {booking.customer_email}
                </p>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => navigate(`/booking/${booking.booking_id}`)}
                  className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  <Eye size={16} /> View Details
                </button>

                <button
                  onClick={() => setEditingBooking(booking)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 />
                </button>
                <button
                  onClick={() => handleDelete(booking.booking_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
