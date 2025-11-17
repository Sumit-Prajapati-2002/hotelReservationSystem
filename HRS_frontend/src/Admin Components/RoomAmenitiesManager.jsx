"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check, Search } from "lucide-react";
import axios from "axios";

export default function RoomAmenitiesManager() {
  const [amenities, setAmenities] = useState([]);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [newAmenity, setNewAmenity] = useState({ name: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "http://localhost:3000/room-amenity";

  // Fetch amenities from backend
  const fetchAmenities = async () => {
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      setAmenities(Array.isArray(res.data.amenities) ? res.data.amenities : []);
    } catch (err) {
      console.error("Error fetching amenities:", err);
      setAmenities([]);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  // Add or Update
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
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this amenity?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      fetchAmenities();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Search filter
  const filteredAmenities = amenities.filter(
    (a) =>
      a.room_amenity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.room_amenity_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Room Amenities Manager
        </h1>

        {/* Add/Edit Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editingAmenity ? "Edit Amenity" : "Add New Amenity"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Amenity Name *"
              value={editingAmenity?.room_amenity_name || newAmenity.name}
              onChange={(e) =>
                editingAmenity
                  ? setEditingAmenity({
                      ...editingAmenity,
                      room_amenity_name: e.target.value,
                    })
                  : setNewAmenity({ ...newAmenity, name: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Description"
              value={
                editingAmenity?.room_amenity_description ||
                newAmenity.description
              }
              onChange={(e) =>
                editingAmenity
                  ? setEditingAmenity({
                      ...editingAmenity,
                      room_amenity_description: e.target.value,
                    })
                  : setNewAmenity({
                      ...newAmenity,
                      description: e.target.value,
                    })
              }
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddOrUpdate}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              {editingAmenity ? <Check size={18} /> : <PlusCircle size={18} />}
              {editingAmenity ? "Update Amenity" : "Add Amenity"}
            </button>

            {editingAmenity && (
              <button
                onClick={() => setEditingAmenity(null)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-500 transition"
              >
                <X size={18} /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Search + List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Amenities List ({filteredAmenities.length})
            </h2>

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredAmenities.length === 0 ? (
              <div className="text-center py-14 text-gray-500">
                <p className="text-lg">No amenities found.</p>
                <p className="text-sm mt-1">
                  Add your first amenity to get started.
                </p>
              </div>
            ) : (
              filteredAmenities.map((a) => (
                <div
                  key={a.room_amenity_id}
                  className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all
                    ${
                      editingAmenity?.room_amenity_id === a.room_amenity_id
                        ? "bg-blue-50 border-blue-300 shadow-md"
                        : "bg-gray-50 border-transparent hover:border-gray-200 hover:shadow-md"
                    }`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {a.room_amenity_name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {a.room_amenity_description || "No description"}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingAmenity(a)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(a.room_amenity_id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
