// routes/roomCategoryRoutes.js
const express = require("express");
const router = express.Router();

const {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
} = require("../controllers/room_categoryController");

router.post("/", createRoomCategory);

router.get("/", getAllRoomCategories);

router.get("/:id", getRoomCategoryById);

router.put("/:id", updateRoomCategory);

router.delete("/:id", deleteRoomCategory);

module.exports = router;
