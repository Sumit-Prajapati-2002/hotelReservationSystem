const express = require("express");
const router = express.Router();
const {
  createRoomAmenity,
  getAllRoomAmenities,
  getRoomAmenityById,
  updateRoomAmenity,
  deleteRoomAmenity,
} = require("../controllers/roomAmenityController");

router.post("/", createRoomAmenity);
router.get("/", getAllRoomAmenities);
router.get("/:id", getRoomAmenityById);
router.put("/:id", updateRoomAmenity);
router.delete("/:id", deleteRoomAmenity);

module.exports = router;
