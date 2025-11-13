import { Edit2, Trash2 } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    { id: 1, question: "How to book a room?", answer: "Select a room and confirm booking." },
    { id: 2, question: "Can I cancel my booking?", answer: "Yes, 24h before check-in." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-start transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{faq.question}</h3>
            <p className="text-gray-500 mt-1">{faq.answer}</p>
          </div>
          <div className="flex gap-3 mt-2">
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
