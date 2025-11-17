"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Tag } from "lucide-react";
import axios from "axios";
import RoomCategoryModal from "./RoomCategoryModal";

export default function RoomCategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/room-category", {
        withCredentials: true,
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (id) => {
    setEditId(id);
    setModalOpen(true);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`http://localhost:3000/room-category/${id}`, {
        withCredentials: true,
      });

      setCategories((prev) => prev.filter((c) => c.room_category_id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete.");
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Room Categories</h2>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const imageURL =
            cat.category_images?.[0] ||
            "https://via.placeholder.com/600x400?text=No+Image";

          return (
            <div
              key={cat.room_category_id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Room Image */}
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={imageURL}
                  alt={cat.category_name}
                  className="h-full w-full object-cover"
                />

                {/* Offer Badge */}
                {cat.offer?.discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Tag size={14} />
                    {cat.offer.discountPercent}% OFF
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {cat.category_name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {cat.category_description || "No description provided"}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    {cat.offer?.discountPercent > 0 ? (
                      <>
                        <span className="text-lg line-through text-gray-400">
                          Rs. {cat.price_per_night}
                        </span>
                        <br />
                        <span className="text-2xl font-bold text-green-600">
                          Rs. {cat.offer.finalPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-amber-600">
                        Rs. {cat.offer.finalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(cat.room_category_id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => deleteCategory(cat.room_category_id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <RoomCategoryModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        editId={editId}
        onSaved={fetchCategories}
      />
    </div>
  );
}
