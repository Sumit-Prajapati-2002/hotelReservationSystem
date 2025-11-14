"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, PlusCircle, X, Check } from "lucide-react";
import axios from "axios";

export default function RoomsSection() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRoom, setNewRoom] = useState({
    room_no: "",
    room_category_id: "",
    room_capacity: "",
    room_description: "",
    room_image: null,
  });
  const [editingRoom, setEditingRoom] = useState(null);

  const BASE_URL = "http://localhost:3000/room";
  const CATEGORY_URL = "http://localhost:3000/room-category"; // adjust if different

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
      const res = await fetch(CATEGORY_URL);
      const data = await res.json();
      if (data.success) setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchCategories();
  }, []);

  // Helper to get category name
  const getCategoryName = (id) => {
    const category = categories.find((c) => c.room_category_id === id);
    return category ? category.category_name : id;
  };

  // Add new room
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
    if (newRoom.room_image) formData.append("room_image", newRoom.room_image); // <-- change here

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
  const handleEditStart = (room) => {
    setEditingRoom({ ...room });
  };

  // Save edited room
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
    if (editingRoom.room_image) formData.append("file", editingRoom.room_image);

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
      {/* Add Room Form */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Room No"
          value={newRoom.room_no}
          onChange={(e) => setNewRoom({ ...newRoom, room_no: e.target.value })}
          className="p-3 border border-gray-300 rounded-xl w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={newRoom.room_category_id}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              room_category_id: Number(e.target.value),
            })
          }
          className="p-3 border border-gray-300 rounded-xl w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
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
          className="p-3 border border-gray-300 rounded-xl w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Description"
          value={newRoom.room_description}
          onChange={(e) =>
            setNewRoom({ ...newRoom, room_description: e.target.value })
          }
          className="p-3 border border-gray-300 rounded-xl w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewRoom({ ...newRoom, room_image: e.target.files[0] })
          }
          className="p-1 border border-gray-300 rounded-xl"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md"
        >
          <PlusCircle size={18} /> Add
        </button>
      </div>

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room.room_id}
              className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
            >
              {editingRoom?.room_id === room.room_id ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={editingRoom.room_no || ""}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        room_no: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    value={editingRoom.room_category_id || ""}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        room_category_id: Number(e.target.value),
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Category</option>
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
                    type="number"
                    value={editingRoom.room_capacity || ""}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        room_capacity: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    value={editingRoom.room_description || ""}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        room_description: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        room_image: e.target.files[0],
                      })
                    }
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-gray-900">{room.room_no}</h3>
                  <p className="text-gray-500 mt-1">
                    Category: {getCategoryName(room.room_category_id)}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Capacity: {room.room_capacity}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Description: {room.room_description || "-"}
                  </p>
                  {room.room_image && (
                    <img
                      src={room.room_image}
                      alt={room.room_no}
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {editingRoom?.room_id === room.room_id ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check />
                    </button>
                    <button
                      onClick={() => setEditingRoom(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(room)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(room.room_id)}
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
