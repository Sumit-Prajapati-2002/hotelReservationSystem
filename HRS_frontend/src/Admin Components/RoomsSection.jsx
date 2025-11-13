import { Edit2, Trash2 } from "lucide-react";

export default function RoomsSection() {
  const rooms = [
    { id: 1, name: "Room 101", category: "Deluxe" },
    { id: 2, name: "Room 102", category: "Suite" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{room.name}</h3>
            <p className="text-gray-500">Category: {room.category}</p>
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
