"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function RoomCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    category_name: "",
    category_description: "",
    price_per_night: "",
    category_images: null, // for image upload
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch category if editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:3000/room-category/${id}`, {
          withCredentials: true, // include admin cookie
        })
        .then((res) => {
          const cat = res.data.category;
          setForm({
            category_name: cat.category_name,
            category_description: cat.category_description || "",
            price_per_night: cat.price_per_night,
            category_images: null,
          });
        })
        .catch((err) => console.error("Error loading category:", err));
    }
  }, [id, isEdit]);

  // ✅ Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image file input
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, category_images: e.target.files }));
  };

  // ✅ Submit handler (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("category_name", form.category_name);
      formData.append("category_description", form.category_description);
      formData.append("price_per_night", form.price_per_night);

      if (form.category_images) {
        for (let i = 0; i < form.category_images.length; i++) {
          formData.append("images", form.category_images[i]);
        }
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ send auth cookie
      };

      if (isEdit) {
        await axios.put(
          `http://localhost:3000/room-category/${id}`,
          formData,
          config
        );
        alert("✅ Category updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3000/room-category",
          formData,
          config
        );
        alert("✅ Category added successfully!");
      }

      // ✅ Redirect back to Admin Dashboard (Room Categories section)
      navigate("/admin-dashboard", { state: { section: "roomCategories" } });
    } catch (err) {
      console.error("Error saving category:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized: Please log in again.");
        navigate("/admin-login");
      } else {
        alert("❌ Failed to save category. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Go back to dashboard button
  const handleBack = () => {
    navigate("/admin-dashboard", { state: { section: "roomCategories" } });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Room Category" : "Add New Room Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="category_name"
          value={form.category_name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <textarea
          name="category_description"
          value={form.category_description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="price_per_night"
          value={form.price_per_night}
          onChange={handleChange}
          placeholder="Price per night"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border rounded-lg px-3 py-2"
          accept="image/*"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Back to Dashboard
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Category"
              : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
