const express = require("express");
const router = express.Router();

const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", createRoom);

router.get("/", getRooms);

router.get("/:id", getRoomById);

router.put("/:id", authenticateAdmin, updateRoom);

router.delete("/:id", authenticateAdmin, deleteRoom);

module.exports = router;
