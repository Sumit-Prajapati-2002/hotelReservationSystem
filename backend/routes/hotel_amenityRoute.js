const express = require("express");
const router = express.Router();
const {
  createHotelAmenity,
  getAllHotelAmenities,
  getHotelAmenityById,
  updateHotelAmenity,
  deleteHotelAmenity,
} = require("../controllers/hotel_amenityController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", authenticateAdmin,createHotelAmenity);
router.get("/", authenticateAdmin,getAllHotelAmenities);
router.get("/:id",authenticateAdmin, getHotelAmenityById);
router.put("/:id",authenticateAdmin, updateHotelAmenity);
router.delete("/:id",authenticateAdmin, deleteHotelAmenity);

module.exports = router;
