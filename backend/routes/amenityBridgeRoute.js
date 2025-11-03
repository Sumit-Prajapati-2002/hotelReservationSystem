const express = require("express");
const router = express.Router();
const {
  addAmenitiesToCategories,
  getAmenitiesByCategoryController,
  removeAmenityFromCategoryController,
} = require("../controllers/amenityBridgeController");

// Add amenities (single or multiple)
router.post("/", addAmenitiesToCategories);

// Get all amenities for a category
router.get("/:room_category_id", getAmenitiesByCategoryController);

// Remove amenities (single or multiple)
router.delete("/", removeAmenityFromCategoryController);

module.exports = router;
