"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RoomCategoryModal({ open, onClose, editId, onSaved }) {
  const isEdit = Boolean(editId);

  const [form, setForm] = useState({
    category_name: "",
    category_description: "",
    price_per_night: "",
    category_images: null,
    offer_id: "", // <-- new field
  });

  const [offers, setOffers] = useState([]); // fetch available offers
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch offers for dropdown
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/offer`);
        const activeOffers = (res.data.offers || []).filter((o) => o.is_active);
        setOffers(activeOffers);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  // Load category data when editing
  useEffect(() => {
    if (!isEdit || !open) return;

    axios
      .get(`${BASE_URL}/room-category/${editId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const c = res.data.category;
        setForm({
          category_name: c.category_name,
          category_description: c.category_description || "",
          price_per_night: c.price_per_night,
          category_images: null,
          offer_id: c.offer?.offer_id || "", // <-- populate selected offer
        });
      })
      .catch((err) => console.error("Error loading category:", err));
  }, [editId, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, category_images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("category_name", form.category_name);
      fd.append("category_description", form.category_description);
      fd.append("price_per_night", form.price_per_night);
      fd.append("offer_id", form.offer_id); // <-- send selected offer

      if (form.category_images) {
        for (let i = 0; i < form.category_images.length; i++) {
          fd.append("images", form.category_images[i]);
        }
      }

      if (isEdit) {
        await axios.put(`${BASE_URL}/room-category/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("Category updated!");
      } else {
        await axios.post(`${BASE_URL}/room-category`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("Category created!");
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Check console.");
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Room Category" : "Add Room Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="category_name"
            value={form.category_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Category Name"
            required
          />

          <textarea
            name="category_description"
            value={form.category_description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Description"
          />

          <input
            type="number"
            name="price_per_night"
            value={form.price_per_night}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Price per night"
            required
          />

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded-lg"
            accept="image/*"
          />

          {/* Offer Dropdown */}
          <select
            name="offer_id"
            value={form.offer_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">No Offer</option>
            {offers.map((offer) => (
              <option key={offer.offer_id} value={offer.offer_id}>
                {offer.offer_title} ({offer.discount_percent}% OFF)
              </option>
            ))}
          </select>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Saving…" : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
