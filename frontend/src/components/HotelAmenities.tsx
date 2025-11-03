import AmenityCard from "./AmenityCard";

export interface Amenity {
  name: string;
  desc: string;
  image: string;
}

export default function HotelAmenities() {
  const amenities: Amenity[] = [
    {
      name: "Free High-Speed WiFi",
      desc: "Stay connected throughout your stay",
      image:
        "https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=800&q=80",
    },
    {
      name: "Fine Dining Restaurant",
      desc: "Award-winning cuisine and service",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    },
    {
      name: "Valet Parking",
      desc: "Complimentary parking service",
      image:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    },
    {
      name: "Fitness Center",
      desc: "24/7 state-of-the-art gym",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    },
    {
      name: "Infinity Pool",
      desc: "Rooftop pool with stunning views",
      image:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
    },
    {
      name: "Lounge & Bar",
      desc: "Premium drinks and ambiance",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    },
  ];

  return (
    <section
      id="amenities"
      className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Hotel Amenities
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need for a memorable and comfortable stay
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {amenities.map((amenity, idx) => (
            <AmenityCard key={idx} {...amenity} />
          ))}
        </div>
      </div>
    </section>
  );
}
