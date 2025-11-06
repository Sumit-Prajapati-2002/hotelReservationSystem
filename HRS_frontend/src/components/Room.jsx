import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";

export default function Rooms() {
  const [roomCategories, setRoomCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/room-category");
        if (!res.data.success) throw new Error("Failed to load categories");
        setRoomCategories(res.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <section id="rooms" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Rooms</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our carefully designed rooms, each offering unique comfort
          and style for your perfect stay.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {roomCategories.map((room) => (
            <RoomCard
              key={room.room_category_id}
              name={room.category_name}
              description={room.category_description}
              image={room.category_images?.[0]}
              price={room.offer ? room.offer.finalPrice : room.price_per_night}
              originalPrice={
                room.offer ? room.price_per_night : null
              } // show strike-through price if offer exists
              discountPercent={room.offer?.discountPercent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
