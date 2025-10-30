const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const {
  createHotelAmenity,
  getAllHotelAmenities,
  getHotelAmenityById,
  updateHotelAmenity,
  deleteHotelAmenity,
} = require("../controllers/hotel_amenityController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post(
  "/",
  authenticateAdmin,
  upload.single("hotel_amenity_image"),
  createHotelAmenity
);
router.get("/", authenticateAdmin, getAllHotelAmenities);
router.get("/:id", authenticateAdmin, getHotelAmenityById);
router.put("/:id", authenticateAdmin, updateHotelAmenity);
router.delete("/:id", authenticateAdmin, deleteHotelAmenity);

module.exports = router;
