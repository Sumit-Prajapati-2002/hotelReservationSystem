const {
  createHotelAmenityService,
  getAllHotelAmenitiesService,
  getHotelAmenityByIdService,
  updateHotelAmenityService,
  deleteHotelAmenityService,
} = require("../services/hotelAmenityService");

async function createHotelAmenity(req, res) {
  try {
    const hotelAmenity = await createHotelAmenityService(req);
    res.status(201).json({ success: true, hotelAmenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllHotelAmenities(req, res) {
  try {
    const amenities = await getAllHotelAmenitiesService();
    res.status(200).json({ success: true, amenities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getHotelAmenityById(req, res) {
  try {
    const amenity = await getHotelAmenityByIdService(req.params.id);
    if (!amenity) {
      return res.status(404).json({ error: "Hotel amenity not found" });
    }
    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateHotelAmenity(req, res) {
  try {
    const amenity = await updateHotelAmenityService(req);
    if (!amenity) {
      return res.status(404).json({ error: "Hotel amenity not found" });
    }
    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteHotelAmenity(req, res) {
  try {
    const deleted = await deleteHotelAmenityService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Hotel amenity not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Hotel amenity deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createHotelAmenity,
  getAllHotelAmenities,
  getHotelAmenityById,
  updateHotelAmenity,
  deleteHotelAmenity,
};
