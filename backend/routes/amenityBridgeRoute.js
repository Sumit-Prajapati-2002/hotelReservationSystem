const express = require("express");
const router = express.Router();
const {
  addAmenitiesToCategories,
  getAmenitiesByCategoryController,
  removeAmenityFromCategoryController,
  updateAmenitiesForCategoryController,
} = require("../controllers/amenityBridgeController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

// Add amenities (single or multiple)
router.post("/add", authenticateAdmin, addAmenitiesToCategories);

// Update amenities (replace all)
router.post("/update", authenticateAdmin, updateAmenitiesForCategoryController);

// Get all amenities for a category
router.get(
  "/:room_category_id",
  authenticateAdmin,
  getAmenitiesByCategoryController
);

// Remove amenities (single or multiple)
router.delete("/", authenticateAdmin, removeAmenityFromCategoryController);

module.exports = router;
  