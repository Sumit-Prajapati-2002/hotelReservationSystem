const Hotel_Amenity = require("../models/hotel_amenity");


async function createHotelAmenity(req, res) {
  try {
    const { hotel_amenity_name, hotel_amenity_images } = req.body;

    const hotelAmenity = await Hotel_Amenity.create({
      hotel_amenity_name,
      hotel_amenity_images,
    });

    res.status(201).json({ success: true, hotelAmenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getAllHotelAmenities(req, res) {
  try {
    const amenities = await Hotel_Amenity.findAll();
    res.status(200).json({ success: true, amenities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getHotelAmenityById(req, res) {
  try {
    const { id } = req.params;
    const amenity = await Hotel_Amenity.findByPk(id);

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
    const { id } = req.params;
    const { hotel_amenity_name, hotel_amenity_images } = req.body;

    const amenity = await Hotel_Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ error: "Hotel amenity not found" });
    }

    await amenity.update({
      hotel_amenity_name,
      hotel_amenity_images,
    });

    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteHotelAmenity(req, res) {
  try {
    const { id } = req.params;
    const amenity = await Hotel_Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ error: "Hotel amenity not found" });
    }

    await amenity.destroy();
    res.status(200).json({ success: true, message: "Hotel amenity deleted successfully" });
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
