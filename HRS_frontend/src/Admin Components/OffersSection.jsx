import { Edit2, Trash2 } from "lucide-react";

export default function OffersSection() {
  const offers = [
    { id: 1, title: "Summer Discount", discount: "20%" },
    { id: 2, title: "Weekend Offer", discount: "15%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{offer.title}</h3>
            <p className="text-gray-500">Discount: {offer.discount}</p>
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
