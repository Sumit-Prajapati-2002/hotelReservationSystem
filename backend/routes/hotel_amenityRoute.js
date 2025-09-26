const express = require("express");
const router = express.Router();
const {
  createHotelAmenity,
  getAllHotelAmenities,
  getHotelAmenityById,
  updateHotelAmenity,
  deleteHotelAmenity,
} = require("../controllers/hotel_amenityController");

router.post("/", createHotelAmenity);
router.get("/", getAllHotelAmenities);
router.get("/:id", getHotelAmenityById);
router.put("/:id", updateHotelAmenity);
router.delete("/:id", deleteHotelAmenity);

module.exports = router;
