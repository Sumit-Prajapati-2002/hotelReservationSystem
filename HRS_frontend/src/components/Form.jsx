import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form({ availableRooms }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkIn_date: null,
    checkOut_date: null,
    num_guest: 1,
    rooms: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomToggle = (roomId) => {
    setFormData((prev) => {
      const rooms = prev.rooms.includes(roomId)
        ? prev.rooms.filter((id) => id !== roomId)
        : [...prev.rooms, roomId];
      return { ...prev, rooms };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert date objects to string format YYYY-MM-DD
      const payload = {
        ...formData,
        checkIn_date: formData.checkIn_date
          ? formData.checkIn_date.toISOString().split("T")[0]
          : null,
        checkOut_date: formData.checkOut_date
          ? formData.checkOut_date.toISOString().split("T")[0]
          : null,
        rooms: formData.rooms.map((room_id) => ({ room_id })),
      };

      const res = await axios.post(
        `${BASE_URL}/customer/login-booking`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/confirmation"); // redirect to booking confirmation page
      } else {
        setError(res.data.message || "Login or booking failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Customer Login & Booking
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email & Password */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />

          {/* Check-in & Check-out */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Check-in</label>
              <DatePicker
                selected={formData.checkIn_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, checkIn_date: date }))
                }
                selectsStart
                startDate={formData.checkIn_date}
                endDate={formData.checkOut_date}
                placeholderText="Select check-in"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Check-out</label>
              <DatePicker
                selected={formData.checkOut_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, checkOut_date: date }))
                }
                selectsEnd
                startDate={formData.checkIn_date}
                endDate={formData.checkOut_date}
                minDate={formData.checkIn_date}
                placeholderText="Select check-out"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Number of Guests */}
          <input
            type="number"
            name="num_guest"
            min={1}
            value={formData.num_guest}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="Number of Guests"
            required
          />

          {/* Room Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select Rooms</label>
            <div className="flex flex-wrap gap-2">
              {availableRooms?.map((room) => (
                <button
                  type="button"
                  key={room.room_id}
                  onClick={() => handleRoomToggle(room.room_id)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    formData.rooms.includes(room.room_id)
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Room {room.room_no}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition shadow-md hover:shadow-xl"
          >
            {loading ? "Submitting..." : "Login & Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
