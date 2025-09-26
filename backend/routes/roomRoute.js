const express = require("express");
const router = express.Router();

const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

// Create a room
router.post("/", createRoom);

// Get all rooms
router.get("/", getRooms);

// Get one room by ID
router.get("/:id", getRoomById);

// Update a room
router.put("/:id", updateRoom);

// Delete a room
router.delete("/:id", deleteRoom);

module.exports = router;
