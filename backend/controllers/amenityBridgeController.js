const {
  addAmenityToCategory,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
} = require("../services/amenityBridgeService");

// Add amenities
async function addAmenitiesToCategories(req, res) {
  try {
    const { room_category_id, room_amenity_id } = req.body;
    if (!room_category_id || !room_amenity_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await addAmenityToCategory(
      room_category_id,
      room_amenity_id
    );
    res
      .status(201)
      .json({ success: true, message: "Amenity(s) added", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get amenities by category
async function getAmenitiesByCategoryController(req, res) {
  try {
    const { room_category_id } = req.params;
    const amenities = await getAmenitiesByCategory(room_category_id);
    res.status(200).json({ success: true, amenities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Remove amenities
async function removeAmenityFromCategoryController(req, res) {
  try {
    const { room_category_id, room_amenity_id } = req.body;
    const result = await removeAmenityFromCategory(
      room_category_id,
      room_amenity_id
    );
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addAmenitiesToCategories,
  getAmenitiesByCategoryController,
  removeAmenityFromCategoryController,
};
