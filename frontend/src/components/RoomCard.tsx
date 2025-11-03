interface RoomCardProps {
  name: string;
  image: string;
  price: string;
  description: string;
  features: string[];
  index: number;
}

export default function RoomCard({
  name,
  image,
  price,
  description,
  features,
}: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-full flex flex-col">
      <div className="h-64 relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
          {price}/night
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>

        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition">
          Book Now
        </button>
      </div>
    </div>
  );
}
