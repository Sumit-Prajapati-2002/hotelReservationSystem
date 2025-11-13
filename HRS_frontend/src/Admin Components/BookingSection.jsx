import { Calendar, Edit2, Trash2 } from "lucide-react";

export default function BookingsSection() {
  const bookings = [
    { id: 1, user: "John Doe", date: "2025-11-15", guests: 2 },
    { id: 2, user: "Jane Smith", date: "2025-11-16", guests: 4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{booking.user}</h3>
            <p className="text-gray-500">
              Date: {booking.date} | Guests: {booking.guests}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="text-blue-600 hover:text-blue-800">
              <Edit2 />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
