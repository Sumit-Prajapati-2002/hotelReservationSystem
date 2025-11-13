import { Trash2 } from "lucide-react";

export default function ContactSection() {
  const contacts = [
    { id: 1, name: "Charlie", email: "charlie@example.com", message: "Inquiry about booking" },
    { id: 2, name: "Diana", email: "diana@example.com", message: "Need support" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {contacts.map((c) => (
        <div
          key={c.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-start transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{c.name}</h3>
            <p className="text-gray-500">{c.email}</p>
            <p className="text-gray-600 mt-2">{c.message}</p>
          </div>
          <button className="text-red-600 hover:text-red-800 mt-2">
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  );
}
