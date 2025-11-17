"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Check, Layers, Sparkles } from "lucide-react";

export default function AssignAmenitiesToCategory() {
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and amenities
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
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch amenities assigned to selected category
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
      console.error("Failed to load assigned amenities:", err);
    }
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
            <Sparkles className="text-indigo-600" size={36} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Assign Amenities
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Assign room amenities to categories effortlessly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Layers size={24} className="text-indigo-600" />
            Room Category Assignment
          </h2>

          {/* Category Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Room Category <span className="text-red-500">*</span>
            </label>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         bg-white text-gray-800 transition-all"
            >
              <option value="">Choose category...</option>
              {categories.map((c) => (
                <option key={c.room_category_id} value={c.room_category_id}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities Checklist */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Amenities
            </label>

            <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-gray-500">Loading amenities...</p>
              ) : (
                amenities.map((a) => (
                  <label
                    key={a.room_amenity_id}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl mb-2 
                    border-2 border-transparent hover:border-indigo-300 
                    hover:bg-indigo-50 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(a.room_amenity_id)}
                      onChange={() => toggleAmenity(a.room_amenity_id)}
                      className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {a.room_amenity_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {a.room_amenity_description}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {selectedAmenities.length} amenities selected
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!selectedCategory}
            className={`w-full mt-6 py-4 rounded-xl font-semibold shadow-lg transition-all
              flex items-center justify-center gap-2
              ${
                selectedCategory
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-xl"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            <Check size={20} /> Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
