"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check } from "lucide-react";
import axios from "axios";

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAmenity, setNewAmenity] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editingAmenity, setEditingAmenity] = useState(null);

  const BASE_URL = "http://localhost:3000/hotel-amenity";

  // Fetch all amenities
  const fetchAmenities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL);
      setAmenities(Array.isArray(res.data.amenities) ? res.data.amenities : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch amenities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  // Add new amenity
  const handleAdd = async () => {
    if (!newAmenity.name.trim()) return;

    const formData = new FormData();
    formData.append("hotel_amenity_name", newAmenity.name);
    formData.append("hotel_amenity_description", newAmenity.description);
    if (newAmenity.image)
      formData.append("hotel_amenity_image", newAmenity.image); // match backend

    try {
      const res = await axios.post(BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      // res.data.amenity contains the new object
      setAmenities([...amenities, res.data.amenity]);
      setNewAmenity({ name: "", description: "", image: null });
    } catch (err) {
      console.error(err);
      alert("Failed to add amenity");
    }
  };

  // Delete amenity
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      setAmenities(amenities.filter((a) => a.hotel_amenity_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete amenity");
    }
  };

  // Start editing
  const handleEditStart = (amenity) => {
    setEditingAmenity({ ...amenity });
  };

  // Save edited amenity
  const handleEditSave = async () => {
    if (!editingAmenity) return;

    const formData = new FormData();
    formData.append(
      "hotel_amenity_name",
      editingAmenity.hotel_amenity_name || ""
    );
    formData.append(
      "hotel_amenity_description",
      editingAmenity.hotel_amenity_description || ""
    );
    if (editingAmenity.image)
      formData.append("hotel_amenity_image", editingAmenity.image);

    try {
      const res = await axios.put(
        `${BASE_URL}/${editingAmenity.hotel_amenity_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // Merge updated amenity using res.data.amenity
      setAmenities(
        amenities.map((a) =>
          a.hotel_amenity_id === editingAmenity.hotel_amenity_id
            ? { ...a, ...res.data.amenity }
            : a
        )
      );
      setEditingAmenity(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update amenity");
    }
  };

  return (
    <div>
      {/* Add Amenity Form */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hotel Amenities</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newAmenity.name}
            onChange={(e) =>
              setNewAmenity({ ...newAmenity, name: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            type="text"
            placeholder="Description"
            value={newAmenity.description}
            onChange={(e) =>
              setNewAmenity({ ...newAmenity, description: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewAmenity({ ...newAmenity, image: e.target.files[0] })
            }
            className="p-1 border border-gray-300 rounded-xl"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md"
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading amenities...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.hotel_amenity_id} // safe unique key
              className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
            >
              {editingAmenity?.hotel_amenity_id === amenity.hotel_amenity_id ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={editingAmenity.hotel_amenity_name || ""}
                    onChange={(e) =>
                      setEditingAmenity({
                        ...editingAmenity,
                        hotel_amenity_name: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <input
                    type="text"
                    value={editingAmenity.hotel_amenity_description || ""}
                    onChange={(e) =>
                      setEditingAmenity({
                        ...editingAmenity,
                        hotel_amenity_description: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      setEditingAmenity({
                        ...editingAmenity,
                        image: e.target.files[0],
                      })
                    }
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-gray-900">
                    {amenity.hotel_amenity_name}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {amenity.hotel_amenity_description}
                  </p>
                  {amenity.hotel_amenity_image && (
                    <img
                      src={amenity.hotel_amenity_image}
                      alt={amenity.hotel_amenity_name}
                      className="mt-2 w-32 h-20 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {editingAmenity?.hotel_amenity_id ===
                amenity.hotel_amenity_id ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check />
                    </button>
                    <button
                      onClick={() => setEditingAmenity(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(amenity)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(amenity.hotel_amenity_id)}
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
      )}
    </div>
  );
}
