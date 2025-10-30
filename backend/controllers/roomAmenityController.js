const roomAmenityService = require("../services/roomAmenityService");

// ✅ Create Amenity
async function createRoomAmenity(req, res) {
  try {
    const amenity = await roomAmenityService.createRoomAmenity(req.body);
    res.status(201).json({ success: true, amenity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ✅ Get all amenities
async function getAllRoomAmenities(req, res) {
  try {
    const amenities = await roomAmenityService.getAllRoomAmenities();
    res.status(200).json({ success: true, amenities });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// ✅ Get by ID
async function getRoomAmenityById(req, res) {
  try {
    const amenity = await roomAmenityService.getRoomAmenityById(req.params.id);
    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// ✅ Update
async function updateRoomAmenity(req, res) {
  try {
    const amenity = await roomAmenityService.updateRoomAmenity(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// ✅ Delete
async function deleteRoomAmenity(req, res) {
  try {
    await roomAmenityService.deleteRoomAmenity(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Room Amenity deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createRoomAmenity,
  getAllRoomAmenities,
  getRoomAmenityById,
  updateRoomAmenity,
  deleteRoomAmenity,
};
