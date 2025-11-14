"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignAmenitiesToCategory() {
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Fetch categories and amenities on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, amenRes] = await Promise.all([
          axios.get("http://localhost:3000/room-category", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/room-amenity", {
            withCredentials: true,
          }),
        ]);

        setCategories(catRes.data.categories || []);
        setAmenities(amenRes.data.amenities || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch assigned amenities when category changes
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (!categoryId) return setSelectedAmenities([]);

    try {
      const res = await axios.get(
        `http://localhost:3000/amenity-bridge/${categoryId}`,
        { withCredentials: true }
      );
      setSelectedAmenities(
        Array.isArray(res.data.amenities)
          ? res.data.amenities.map((a) => a.room_amenity_id)
          : []
      );
    } catch (err) {
      console.error("Failed to fetch assigned amenities:", err);
      setSelectedAmenities([]);
    }
  };

  // Toggle selection of amenities
  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Save updated amenities
  const handleSave = async () => {
    if (!selectedCategory) return alert("Select a category");

    try {
      await axios.post(
        "http://localhost:3000/amenity-bridge/update",
        {
          room_category_id: selectedCategory,
          room_amenity_ids: selectedAmenities,
        },
        { withCredentials: true }
      );
      alert("Amenities updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update amenities");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Assign Amenities to Room Category
      </h2>

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border rounded px-3 py-2 mb-4 w-full"
      >
        <option value="">Select Room Category</option>
        {categories.map((c) => (
          <option key={c.room_category_id} value={c.room_category_id}>
            {c.category_name}
          </option>
        ))}
      </select>

      <div className="max-h-64 overflow-y-auto border rounded p-2 mb-4">
        {amenities.map((a) => (
          <label
            key={a.room_amenity_id}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(a.room_amenity_id)}
              onChange={() => toggleAmenity(a.room_amenity_id)}
            />
            {a.room_amenity_name}
          </label>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
