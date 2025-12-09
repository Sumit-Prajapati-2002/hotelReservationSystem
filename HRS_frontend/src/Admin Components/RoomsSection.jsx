"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check, Users } from "lucide-react";
import axios from "axios";

export default function RoomsSection() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    room_no: "",
    room_category_id: "",
    room_capacity: "",
    room_description: "",
    room_image: null,
  });
  const [editingRoom, setEditingRoom] = useState(null);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const BASE_URL = `${URL}/room`;
  const CATEGORY_URL = `${URL}/room-category`;

  const statusColors = {
    available: "bg-green-100 text-green-700",
    occupied: "bg-red-100 text-red-700",
    maintenance: "bg-yellow-100 text-yellow-700",
  };

  // Fetch rooms
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      setRooms(Array.isArray(res.data.rooms) ? res.data.rooms : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL, { withCredentials: true });
      if (res.data.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchCategories();
  }, []);

  const getCategoryName = (id) =>
    categories.find((c) => c.room_category_id === id)?.category_name || id;

  // Add room
  const handleAdd = async () => {
    if (!newRoom.room_no || !newRoom.room_category_id) {
      alert("Room No and Category are required");
      return;
    }

    const formData = new FormData();
    formData.append("room_no", newRoom.room_no);
    formData.append("room_category_id", newRoom.room_category_id);
    formData.append("room_capacity", newRoom.room_capacity || "");
    formData.append("room_description", newRoom.room_description || "");
    if (newRoom.room_image) formData.append("room_image", newRoom.room_image);

    try {
      const res = await axios.post(BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setRooms([...rooms, res.data.room]);
      setNewRoom({
        room_no: "",
        room_category_id: "",
        room_capacity: "",
        room_description: "",
        room_image: null,
      });
      setShowAddModal(false);
    } catch (err) {
      console.error("Add room error:", err.response?.data || err);
      alert("Failed to add room");
    }
  };

  // Delete room
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      setRooms(rooms.filter((r) => r.room_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    }
  };

  // Start editing
  const handleEditStart = (room) => setEditingRoom({ ...room });

  // Save editing
  const handleEditSave = async () => {
    if (!editingRoom) return;

    const formData = new FormData();
    formData.append("room_no", editingRoom.room_no || "");
    formData.append(
      "room_category_id",
      editingRoom.room_category_id.toString()
    );
    formData.append("room_capacity", editingRoom.room_capacity || "");
    formData.append("room_description", editingRoom.room_description || "");
    if (editingRoom.room_image)
      formData.append("room_image", editingRoom.room_image);

    try {
      const res = await axios.put(
        `${BASE_URL}/${editingRoom.room_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setRooms(
          rooms.map((r) =>
            r.room_id === editingRoom.room_id ? res.data.room : r
          )
        );
        setEditingRoom(null);
      } else {
        alert("Failed to update room");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update room");
    }
  };

  return (
    <div>
      {/* Add Room Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md"
        >
          <PlusCircle size={18} /> Add Room
        </button>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Room</h2>
            <input
              type="text"
              placeholder="Room No"
              value={newRoom.room_no}
              onChange={(e) =>
                setNewRoom({ ...newRoom, room_no: e.target.value })
              }
              className="p-3 border rounded-xl w-full mb-3"
            />
            <select
              value={newRoom.room_category_id}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  room_category_id: Number(e.target.value),
                })
              }
              className="p-3 border rounded-xl w-full mb-3"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.room_category_id} value={cat.room_category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Capacity"
              value={newRoom.room_capacity}
              onChange={(e) =>
                setNewRoom({ ...newRoom, room_capacity: e.target.value })
              }
              className="p-3 border rounded-xl w-full mb-3"
            />
            <input
              type="text"
              placeholder="Description"
              value={newRoom.room_description}
              onChange={(e) =>
                setNewRoom({ ...newRoom, room_description: e.target.value })
              }
              className="p-3 border rounded-xl w-full mb-3"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewRoom({ ...newRoom, room_image: e.target.files[0] })
              }
              className="p-1 border rounded-xl mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room.room_id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100 flex flex-col justify-between"
            >
              {/* Room Info */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {editingRoom?.room_id === room.room_id ? (
                    <input
                      type="text"
                      value={editingRoom.room_no}
                      onChange={(e) =>
                        setEditingRoom({
                          ...editingRoom,
                          room_no: e.target.value,
                        })
                      }
                      className="w-12 text-center rounded-md"
                    />
                  ) : (
                    room.room_no
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[room.room_status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {room.room_status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {editingRoom?.room_id === room.room_id ? (
                  <>
                    <input
                      type="number"
                      value={editingRoom.room_capacity}
                      onChange={(e) =>
                        setEditingRoom({
                          ...editingRoom,
                          room_capacity: e.target.value,
                        })
                      }
                      className="p-2 border rounded w-full"
                      placeholder="Capacity"
                    />
                    <select
                      value={editingRoom.room_category_id}
                      onChange={(e) =>
                        setEditingRoom({
                          ...editingRoom,
                          room_category_id: Number(e.target.value),
                        })
                      }
                      className="p-2 border rounded w-full"
                    >
                      {categories.map((cat) => (
                        <option
                          key={cat.room_category_id}
                          value={cat.room_category_id}
                        >
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editingRoom.room_description}
                      onChange={(e) =>
                        setEditingRoom({
                          ...editingRoom,
                          room_description: e.target.value,
                        })
                      }
                      className="p-2 border rounded w-full"
                      placeholder="Description"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditingRoom({
                          ...editingRoom,
                          room_image: e.target.files[0],
                        })
                      }
                      className="p-1 border rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <Users size={16} className="text-amber-600" />
                      Capacity: {room.room_capacity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Category: {getCategoryName(room.room_category_id)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {room.room_description || "-"}
                    </p>
                    {room.room_image && (
                      <img
                        src={room.room_image}
                        alt={room.room_no}
                        className="mt-2 w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                {editingRoom?.room_id === room.room_id ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="text-green-600 hover:text-green-800 flex-1"
                    >
                      <Check className="mx-auto" />
                    </button>
                    <button
                      onClick={() => setEditingRoom(null)}
                      className="text-red-600 hover:text-red-800 flex-1"
                    >
                      <X className="mx-auto" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(room)}
                      className="text-blue-600 hover:text-blue-800 flex-1"
                    >
                      <Edit2 className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.room_id)}
                      className="text-red-600 hover:text-red-800 flex-1"
                    >
                      <Trash2 className="mx-auto" />
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
