const {
  addAmenityToCategory,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
  updateAmenitiesForCategory,
} = require("../services/amenityBridgeService");

// Get amenities for a category
async function getAmenitiesByCategoryController(req, res) {
  try {
    const { room_category_id } = req.params;
    const amenities = await getAmenitiesByCategory(room_category_id);
    res.status(200).json({ success: true, amenities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update amenities for a category
async function updateAmenitiesForCategoryController(req, res) {
  try {
    const { room_category_id, room_amenity_ids } = req.body;
    if (!room_category_id || !room_amenity_ids)
      return res.status(400).json({ error: "Missing required fields" });

    const result = await updateAmenitiesForCategory(
      room_category_id,
      room_amenity_ids
    );
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add amenities (single or multiple)
async function addAmenitiesToCategories(req, res) {
  try {
    const { room_category_id, room_amenity_ids } = req.body; // array of IDs
    if (!room_category_id || !room_amenity_ids || !room_amenity_ids.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await addAmenityToCategory(
      room_category_id,
      room_amenity_ids
    );
    res
      .status(201)
      .json({ success: true, message: "Amenity(s) added", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get amenities by category
// async function getAmenitiesByCategoryController(req, res) {
//   try {
//     const { room_category_id } = req.params;
//     const amenities = await getAmenitiesByCategory(room_category_id);
//     res.status(200).json({ success: true, amenities });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// Remove amenities (single or multiple)
async function removeAmenityFromCategoryController(req, res) {
  try {
    const { room_category_id, room_amenity_ids } = req.body; // array of IDs
    if (!room_category_id || !room_amenity_ids || !room_amenity_ids.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await removeAmenityFromCategory(
      room_category_id,
      room_amenity_ids
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
  updateAmenitiesForCategoryController,
};
