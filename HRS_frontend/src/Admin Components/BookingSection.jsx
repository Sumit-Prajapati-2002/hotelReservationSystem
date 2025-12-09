import { useState, useEffect } from "react";
import { Edit2, Trash2, Eye, Check, X, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/booking`, {
        withCredentials: true,
      });
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
        status: editingBooking.status,
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

  const statusColors = {
    booked: "bg-blue-100 text-blue-700",
    "checked-in": "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusOptions = ["booked", "checked-in", "completed", "cancelled"];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const isEditing = editingBooking?.booking_id === booking.booking_id;

            return (
              <div
                key={booking.booking_id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* Booking title + status */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        #{booking.booking_id}
                      </h3>

                      {!isEditing ? (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>
                      ) : (
                        <select
                          value={editingBooking.status}
                          onChange={(e) =>
                            setEditingBooking({
                              ...editingBooking,
                              status: e.target.value,
                            })
                          }
                          className="px-2 py-1 border rounded-lg text-sm"
                        >
                          {statusOptions.map((s) => (
                            <option value={s} key={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Dates */}
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar size={16} className="text-amber-600" />
                      {booking.checkIn_date} → {booking.checkOut_date}
                    </p>

                    {/* Email */}
                    <p className="text-gray-600 mt-2 flex items-center gap-2">
                      <Mail size={16} className="text-amber-600" />
                      {booking.customer_email}
                    </p>

                    {/* Price */}
                    <p className="text-gray-900 font-bold text-xl mt-4">
                      RS.{booking.total_price}
                    </p>

                    {/* Editing action buttons */}
                    {isEditing && (
                      <div className="flex items-center mt-4 gap-3">
                        <button
                          onClick={handleEditSave}
                          className="flex items-center gap-1 text-green-600 hover:text-green-800"
                        >
                          <Check /> Save
                        </button>

                        <button
                          onClick={() => setEditingBooking(null)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800"
                        >
                          <X /> Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  {!isEditing && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() =>
                          navigate(`/booking/${booking.booking_id}`)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={20} />
                      </button>

                      <button
                        onClick={() => setEditingBooking(booking)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(booking.booking_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
