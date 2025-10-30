const {
  createRoomService,
  updateRoomService,
  getRoomsService,
  getRoomByIdService,
  deleteRoomService,
} = require("../services/roomService");

async function createRoom(req, res) {
  try {
    const room = await createRoomService(req.body, req.file, req);
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateRoom(req, res) {
  try {
    const room = await updateRoomService(req.params.id, req.body, req.file, req);
    res.json({ success: true, room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getRooms(req, res) {
  try {
    const { page, limit } = req.query;
    const result = await getRoomsService(parseInt(page), parseInt(limit));
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRoomById(req, res) {
  try {
    const room = await getRoomByIdService(req.params.id);
    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function deleteRoom(req, res) {
  try {
    const result = await deleteRoomService(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createRoom,
  updateRoom,
  getRooms,
  getRoomById,
  deleteRoom,
};
