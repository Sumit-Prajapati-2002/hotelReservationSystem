"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Mail, Phone, X } from "lucide-react";
import axios from "axios";

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/customer/", {
        withCredentials: true,
      });

      const data = res.data;

      if (data.success && Array.isArray(data.customers)) {
        setUsers(data.customers);
      } else {
        console.error("Failed to fetch customers", data);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }

    setLoading(false);
  };

  // Fetch booking history for a user
  const fetchBookingHistory = async (customer_id) => {
    setHistoryLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:3000/booking-history/${customer_id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Booking history response:", res.data);

      if (res.data.success && Array.isArray(res.data.history)) {
        setBookingHistory(res.data.history); // <-- FIXED
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (err) {
      console.error("Error fetching booking history:", err);
    }

    setHistoryLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <>
      {/* USER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={user.email || index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user.firstname?.charAt(0).toUpperCase()}
              </div>

              <CheckCircle className="text-green-500" size={24} />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-2">
              {user.firstname} {user.lastname}
            </h3>

            <div className="space-y-2 text-sm">
              <p className="text-gray-600 flex items-center gap-2">
                <Mail size={16} className="text-amber-600" />
                {user.email}
              </p>

              <p className="text-gray-600 flex items-center gap-2">
                <Phone size={16} className="text-amber-600" />
                {user.phone_no}
              </p>

              <p className="text-gray-500 text-xs mt-3">
                Joined:{" "}
                {user.created_at
                  ? new Date(user.created_at).toISOString().split("T")[0]
                  : "N/A"}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedUser(user);
                fetchBookingHistory(user.customer_id);
              }}
              className="mt-4 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              View Bookings
            </button>
          </div>
        ))}
      </div>

      {/* BOOKING HISTORY MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => {
                setSelectedUser(null);
                setBookingHistory([]);
              }}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Booking History of {selectedUser.firstname}
            </h2>

            {historyLoading ? (
              <p>Loading booking history...</p>
            ) : bookingHistory.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {bookingHistory.map((b) => (
                  <div
                    key={b.booking_id}
                    className="p-4 border rounded-lg bg-gray-50"
                  >
                    <p>
                      <strong>Booking ID:</strong> {b.booking_id}
                    </p>
                    <p>
                      <strong>Check-in:</strong> {b.checkIn_date}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {b.checkOut_date}
                    </p>
                    <p>
                      <strong>Status:</strong> {b.status}
                    </p>
                    <p>
                      <strong>Total Price:</strong> Rs {b.total_price}
                    </p>

                    <p className="mt-2 font-semibold">Rooms:</p>
                    <ul className="ml-4 list-disc">
                      {b.rooms?.map((room, i) => (
                        <li key={i}>
                          Room {room.room_no} — {room.category_name} (Rs{" "}
                          {room.price_per_night}/night)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
