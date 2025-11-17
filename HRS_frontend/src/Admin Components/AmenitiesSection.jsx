"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check } from "lucide-react";
import axios from "axios";
import Modal from "./Modal"; // simple reusable modal component

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState(null); // null = add, object = edit
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const BASE_URL = "http://localhost:3000/hotel-amenity";

  // Fetch amenities
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

  const openAddModal = () => {
    setCurrentAmenity(null);
    setFormData({ name: "", description: "", image: null });
    setModalOpen(true);
  };

  const openEditModal = (amenity) => {
    setCurrentAmenity(amenity);
    setFormData({
      name: amenity.hotel_amenity_name,
      description: amenity.hotel_amenity_description,
      image: null,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this amenity?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      setAmenities(amenities.filter((a) => a.hotel_amenity_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete amenity");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    const data = new FormData();
    data.append("hotel_amenity_name", formData.name);
    data.append("hotel_amenity_description", formData.description);
    if (formData.image) data.append("hotel_amenity_image", formData.image);

    try {
      let res;
      if (currentAmenity) {
        // Edit
        res = await axios.put(
          `${BASE_URL}/${currentAmenity.hotel_amenity_id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setAmenities(
          amenities.map((a) =>
            a.hotel_amenity_id === currentAmenity.hotel_amenity_id
              ? { ...a, ...res.data.amenity }
              : a
          )
        );
      } else {
        // Add
        res = await axios.post(BASE_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setAmenities([...amenities, res.data.amenity]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save amenity");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hotel Amenities</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <PlusCircle size={20} /> Add Amenity
        </button>
      </div>

      {loading ? (
        <p>Loading amenities...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.hotel_amenity_id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {amenity.hotel_amenity_name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {amenity.hotel_amenity_description}
                </p>
                {amenity.hotel_amenity_image && (
                  <img
                    src={amenity.hotel_amenity_image}
                    alt={amenity.hotel_amenity_name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openEditModal(amenity)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                >
                  <Edit2 />
                </button>
                <button
                  onClick={() => handleDelete(amenity.hotel_amenity_id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {currentAmenity ? "Edit Amenity" : "Add Amenity"}
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="p-1 border border-gray-300 rounded-xl"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
              >
                {currentAmenity ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
