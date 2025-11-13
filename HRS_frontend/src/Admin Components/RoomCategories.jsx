import { Edit2, Trash2 } from "lucide-react";

export default function RoomCategoriesSection() {
  const categories = [
    { id: 1, name: "Deluxe Room" },
    { id: 2, name: "Suite" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <h3 className="font-bold text-gray-900">{category.name}</h3>
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
