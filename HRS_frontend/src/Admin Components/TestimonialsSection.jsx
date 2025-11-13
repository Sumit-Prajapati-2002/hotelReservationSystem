import { Edit2, Trash2 } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    { id: 1, name: "Alice", comment: "Great service!" },
    { id: 2, name: "Bob", comment: "Loved the rooms." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{t.name}</h3>
            <p className="text-gray-500">{t.comment}</p>
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
