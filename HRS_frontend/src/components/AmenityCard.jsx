
export default function AmenityCard({ name, image, desc }) {
  return (
    <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{name}</h3>
        <p className="text-gray-200 text-sm">{desc}</p>
      </div>
    </div>
  );
}
