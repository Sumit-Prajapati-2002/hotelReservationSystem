"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Check, X, PlusCircle } from "lucide-react";
import Modal from "./Modal"; // your Modal component

export default function AdminOffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Initial state for new offer with all required fields
  const initialNewOffer = {
    offer_title: "",
    offer_description: "",
    discount_percent: "",
    start_date: "",
    end_date: "",
    is_active: true,
  };

  const [newOffer, setNewOffer] = useState(initialNewOffer);

  // Fetch offers
  const fetchOffers = async () => {
    try {
      const res = await fetch("http://localhost:3000/offer", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setOffers(data.offers || data);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Delete offer
  const handleDelete = async (offer_id) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    try {
      const res = await fetch(`http://localhost:3000/offer/${offer_id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setOffers(offers.filter((o) => o.offer_id !== offer_id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEditing = (offer) => {
    setEditingId(offer.offer_id);
    setEditForm({
      offer_name: offer.offer_name || "",
      offer_title: offer.offer_title || "",
      discount_percent: offer.discount_percent || "",
      offer_description: offer.offer_description || "",
      start_date: offer.start_date
        ? new Date(offer.start_date).toISOString().split("T")[0]
        : "",
      end_date: offer.end_date
        ? new Date(offer.end_date).toISOString().split("T")[0]
        : "",
      is_active: offer.is_active ?? true,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save edited offer
  const handleUpdate = async (offer_id) => {
    try {
      const res = await fetch(`http://localhost:3000/offer/${offer_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (data.success) {
        setOffers(
          offers.map((o) => (o.offer_id === offer_id ? data.offer : o))
        );
        cancelEditing();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add new offer
  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:3000/offer", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOffer),
      });

      const data = await res.json();
      if (data.success) {
        setOffers([...offers, data.offer]);
        setNewOffer(initialNewOffer);
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading offers...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Manage Offers</h2>
        <button
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl"
          onClick={() => setIsAddOpen(true)}
        >
          <PlusCircle size={18} /> Add Offer
        </button>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.offer_id}
            className="p-6 bg-white rounded-2xl shadow-lg flex flex-col transition-transform hover:scale-105"
          >
            {editingId === offer.offer_id ? (
              <>
                <input
                  type="text"
                  value={editForm.offer_title || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, offer_title: e.target.value })
                  }
                  className="mb-2 p-2 border rounded w-full"
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={editForm.discount_percent || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      discount_percent: e.target.value,
                    })
                  }
                  className="mb-2 p-2 border rounded w-full"
                  placeholder="Discount %"
                />
                <input
                  type="text"
                  value={editForm.offer_description || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      offer_description: e.target.value,
                    })
                  }
                  className="mb-2 p-2 border rounded w-full"
                  placeholder="Description"
                />
                <input
                  type="date"
                  value={editForm.start_date || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, start_date: e.target.value })
                  }
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="date"
                  value={editForm.end_date || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, end_date: e.target.value })
                  }
                  className="mb-2 p-2 border rounded w-full"
                />
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={editForm.is_active ?? true}
                    onChange={(e) =>
                      setEditForm({ ...editForm, is_active: e.target.checked })
                    }
                  />
                  Active
                </label>
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-green-600 text-white p-2 rounded flex items-center gap-1"
                    onClick={() => handleUpdate(offer.offer_id)}
                  >
                    <Check size={16} /> Save
                  </button>
                  <button
                    className="bg-gray-400 text-white p-2 rounded flex items-center gap-1"
                    onClick={cancelEditing}
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {offer.offer_title}
                  </h3>
                  <p className="text-gray-500">
                    Discount: {offer.discount_percent}%
                  </p>
                  {offer.offer_description && (
                    <p className="text-gray-600 mt-2">
                      {offer.offer_description}
                    </p>
                  )}
                  <p className="text-gray-400 mt-1 text-sm">
                    Active: {offer.is_active ? "Yes" : "No"} | End:{" "}
                    {new Date(offer.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => startEditing(offer)}
                  >
                    <Edit2 />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(offer.offer_id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Offer Modal */}
      {isAddOpen && (
        <Modal onClose={() => setIsAddOpen(false)}>
          <h3 className="text-xl font-bold mb-4">Add New Offer</h3>

          <input
            type="text"
            placeholder="Title"
            value={newOffer.offer_title}
            onChange={(e) =>
              setNewOffer({ ...newOffer, offer_title: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Discount %"
            value={newOffer.discount_percent}
            onChange={(e) =>
              setNewOffer({ ...newOffer, discount_percent: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newOffer.offer_description}
            onChange={(e) =>
              setNewOffer({ ...newOffer, offer_description: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newOffer.start_date}
            onChange={(e) =>
              setNewOffer({ ...newOffer, start_date: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={newOffer.end_date}
            onChange={(e) =>
              setNewOffer({ ...newOffer, end_date: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={newOffer.is_active}
              onChange={(e) =>
                setNewOffer({ ...newOffer, is_active: e.target.checked })
              }
            />
            Active
          </label>

          <button
            onClick={handleAdd}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          >
            Add Offer
          </button>
        </Modal>
      )}
    </div>
  );
}
