const Room = require("../models/room");


async function createRoom(req, res) {
  try {
    const { price_per_night, capacity, room_type, room_status, room_images } = req.body;
    const room = await Room.create({
      price_per_night,
      capacity,
      room_type,
      room_status,
      room_images,
    });
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getRooms(req, res) {
  try {
    const rooms = await Room.findAll();
    res.json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getRoomById(req, res) {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function updateRoom(req, res) {
  try {
    const { price_per_night, capacity, room_type, room_status, room_images } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    await room.update({
      price_per_night,
      capacity,
      room_type,
      room_status,
      room_images,
    });

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteRoom(req, res) {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    await room.destroy();
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
