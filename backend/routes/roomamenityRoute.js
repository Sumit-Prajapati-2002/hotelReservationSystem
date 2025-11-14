const express = require("express");
const router = express.Router();
const {
  createRoomAmenity,
  getAllRoomAmenities,
  getRoomAmenityById,
  updateRoomAmenity,
  deleteRoomAmenity,
} = require("../controllers/roomAmenityController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", authenticateAdmin, createRoomAmenity);
router.get("/", authenticateAdmin, getAllRoomAmenities);
router.get("/:id", authenticateAdmin, getRoomAmenityById);
router.put("/:id", authenticateAdmin, updateRoomAmenity);
router.delete("/:id", authenticateAdmin, deleteRoomAmenity);

module.exports = router;
