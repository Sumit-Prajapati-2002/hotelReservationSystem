const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

// Create a room with single image upload (field name must match in Postman: 'room_image')
router.post("/", authenticateAdmin, upload.single("room_image"), createRoom);

// Get all rooms
router.get("/", getRooms);

// Get room by ID
router.get("/:id", authenticateAdmin, getRoomById);

// Update room (optional new image)
router.put("/:id", authenticateAdmin, upload.single("room_image"), updateRoom);

// Delete room
router.delete("/:id", authenticateAdmin, deleteRoom);

module.exports = router;
