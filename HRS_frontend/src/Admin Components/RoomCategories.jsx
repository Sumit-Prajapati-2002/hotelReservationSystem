"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RoomCategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/room-category", {
        withCredentials: true, // ✅ include auth cookie
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/room-category/${id}`, {
        withCredentials: true, // ✅ send auth cookie
      });
      setCategories(categories.filter((c) => c.room_category_id !== id));
      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized: Please log in again.");
        navigate("/admin-login");
      } else {
        alert("❌ Failed to delete category. Check console for details.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Room Categories</h2>
        <button
          onClick={() => navigate("/room-category/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.room_category_id}
            className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
          >
            <div>
              <h3 className="font-bold text-gray-900">
                {category.category_name}
              </h3>
              <p className="text-gray-600 text-sm">
                Rs. {category.price_per_night} / night
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/room-category/${category.room_category_id}`)
                }
                className="text-green-600 hover:text-green-800"
                title="View"
              >
                <Eye />
              </button>
              <button
                onClick={() =>
                  navigate(`/room-category/edit/${category.room_category_id}`)
                }
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <Edit2 />
              </button>
              <button
                onClick={() => handleDelete(category.room_category_id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
