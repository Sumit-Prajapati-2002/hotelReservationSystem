import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AvailableRooms({ categoryId }) {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/room-category/${categoryId}/rooms`
        );
        const data = await res.json();

        if (data.success) {
          setRooms(data.rooms);
          setCategory(data.category);
        } else {
          setError("No rooms found for this category");
        }
      } catch (err) {
        setError("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [categoryId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading rooms...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">
          Available Rooms: {category?.category_name}
        </h2>
        <p className="text-gray-600 mb-8">
          Total Rooms: {category?.totalRooms}
        </p>

        <div className="flex flex-col gap-6">
          {rooms.map((room) => (
            <div
              key={room.room_id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition flex flex-col md:flex-row
                ${
                  room.room_status !== "Available"
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-2xl"
                }
              `}
            >
              {/* Image */}
              <img
                src={room.room_image}
                alt={room.room_description}
                className="w-full md:w-1/3 h-64 md:h-auto object-cover"
              />

              {/* Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Room No {room.room_no}
                  </h3>
                  <p className="text-gray-600 mb-2">{room.room_description}</p>
                  <p className="text-gray-800 font-medium mb-1">
                    Capacity:{" "}
                    <span className="text-amber-600">{room.room_capacity}</span>
                  </p>
                  <p
                    className={`font-medium ${
                      room.room_status === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {room.room_status}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (room.room_status === "Available") {
                      navigate(`/form/${room.room_id}`);
                    }
                  }}
                  disabled={room.room_status !== "Available"}
                  className={`mt-4 w-full md:w-auto py-3 px-6 rounded-xl font-bold text-lg transition shadow-md self-start 
                    ${
                      room.room_status === "Available"
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }
                  `}
                >
                  {room.room_status === "Available"
                    ? "Book Now"
                    : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
