import RoomCard from "./RoomCard";

export interface Room {
  name: string;
  price: string;
  description: string;
  features: string[];
  image: string;
}

export default function Rooms() {
  const rooms: Room[] = [
    {
      name: "Standard Room",
      price: "$129",
      description:
        "Basic, comfortable rooms with essential amenities for a pleasant stay.",
      features: ["Queen Size Bed", "Air Conditioning", "24 m²", "Free WiFi"],
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    },
    {
      name: "Deluxe Room",
      price: "$199",
      description:
        "Mid to upper-tier rooms with enhanced amenities and elegant interiors.",
      features: ["King Size Bed", "City View", "35 m²", "Smart TV"],
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    {
      name: "Suite",
      price: "$299",
      description:
        "Spacious suite with a separate living area for relaxation and comfort.",
      features: ["Living Room", "Mini Bar", "55 m²", "Ocean View"],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    },
    {
      name: "Premium Room",
      price: "$449",
      description:
        "High-end rooms with luxury finishes, superior views, and top-tier amenities.",
      features: [
        "Private Balcony",
        "Panoramic View",
        "65 m²",
        "Luxury Bathroom",
      ],
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    },
  ];

  return (
    <section id="rooms" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Rooms</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our carefully designed rooms, each offering unique comfort
          and style for your perfect stay.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} {...room} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
