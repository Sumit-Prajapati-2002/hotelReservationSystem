"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check } from "lucide-react";
import axios from "axios";

export default function RoomAmenitiesManager() {
  const [amenities, setAmenities] = useState([]);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [newAmenity, setNewAmenity] = useState({ name: "", description: "" });
  const BASE_URL = "http://localhost:3000/room-amenity";

  // Fetch amenities
  const fetchAmenities = async () => {
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      setAmenities(Array.isArray(res.data.amenities) ? res.data.amenities : []);
    } catch (err) {
      console.error("Failed to fetch amenities:", err);
      setAmenities([]);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  // Add or update amenity
  const handleAddOrUpdate = async () => {
    try {
      if (editingAmenity) {
        if (!editingAmenity.room_amenity_name.trim()) return;
        await axios.put(
          `${BASE_URL}/${editingAmenity.room_amenity_id}`,
          {
            room_amenity_name: editingAmenity.room_amenity_name,
            room_amenity_description: editingAmenity.room_amenity_description,
          },
          { withCredentials: true }
        );
        setEditingAmenity(null);
      } else {
        if (!newAmenity.name.trim()) return;
        await axios.post(
          BASE_URL,
          {
            room_amenity_name: newAmenity.name,
            room_amenity_description: newAmenity.description,
          },
          { withCredentials: true }
        );
        setNewAmenity({ name: "", description: "" });
      }
      fetchAmenities();
    } catch (err) {
      console.error("Failed to save amenity:", err);
      alert("Failed to save amenity");
    }
  };

  // Delete amenity
  const handleDelete = async (id) => {
    if (!confirm("Delete this amenity?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      fetchAmenities();
    } catch (err) {
      console.error("Failed to delete amenity:", err);
      alert("Failed to delete amenity");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Room Amenities</h2>

      {/* Add / Edit Form */}
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Name"
          value={editingAmenity?.room_amenity_name || newAmenity.name}
          onChange={(e) =>
            editingAmenity
              ? setEditingAmenity({ ...editingAmenity, room_amenity_name: e.target.value })
              : setNewAmenity({ ...newAmenity, name: e.target.value })
          }
          className="p-2 border rounded-xl w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Description"
          value={editingAmenity?.room_amenity_description || newAmenity.description}
          onChange={(e) =>
            editingAmenity
              ? setEditingAmenity({ ...editingAmenity, room_amenity_description: e.target.value })
              : setNewAmenity({ ...newAmenity, description: e.target.value })
          }
          className="p-2 border rounded-xl w-full md:w-auto"
        />
        <button
          onClick={handleAddOrUpdate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <PlusCircle size={18} /> {editingAmenity ? "Update" : "Add"}
        </button>
        {editingAmenity && (
          <button
            onClick={() => setEditingAmenity(null)}
            className="text-red-600 hover:text-red-800 px-2 py-1 border rounded-xl"
          >
            <X />
          </button>
        )}
      </div>

      {/* Amenities List */}
      <div className="space-y-2">
        {amenities.map((a) => (
          <div
            key={a.room_amenity_id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-xl shadow hover:scale-105 transition-transform"
          >
            <div>
              <strong>{a.room_amenity_name}</strong> - {a.room_amenity_description}
            </div>
            <div className="flex gap-2">
              {editingAmenity?.room_amenity_id === a.room_amenity_id ? (
                <button
                  onClick={handleAddOrUpdate}
                  className="text-green-600 hover:text-green-800"
                >
                  <Check />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditingAmenity(a)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(a.room_amenity_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
