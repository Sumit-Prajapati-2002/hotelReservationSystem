"use client";

export default function AmenityCard({ name, image, desc }) {
  return (
    <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{name}</h3>
        <p className="text-gray-100 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {desc}
        </p>
      </div>
    </div>
  );
}
