const Hotel_Amenity = require("../models/hotel_amenity");

async function createHotelAmenityService(req) {
  const { hotel_amenity_name, hotel_amenity_description } = req.body;

  let hotel_amenity_image = null;
  if (req.file) {
    hotel_amenity_image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  const amenity = await Hotel_Amenity.create({
    hotel_amenity_name,
    hotel_amenity_image,
    hotel_amenity_description,
  });

  return amenity;
}

async function getAllHotelAmenitiesService() {
  return await Hotel_Amenity.findAll();
}

async function getHotelAmenityByIdService(id) {
  return await Hotel_Amenity.findByPk(id);
}

async function updateHotelAmenityService(req) {
  const { id } = req.params;
  const { hotel_amenity_name, hotel_amenity_description } = req.body;

  const amenity = await Hotel_Amenity.findByPk(id);
  if (!amenity) return null;

  let hotel_amenity_image = amenity.hotel_amenity_image;
  if (req.file) {
    hotel_amenity_image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  await amenity.update({
    hotel_amenity_name,
    hotel_amenity_image,
    hotel_amenity_description,
  });

  return amenity;
}

async function deleteHotelAmenityService(id) {
  const amenity = await Hotel_Amenity.findByPk(id);
  if (!amenity) return null;

  await amenity.destroy();
  return true;
}

module.exports = {
  createHotelAmenityService,
  getAllHotelAmenitiesService,
  getHotelAmenityByIdService,
  updateHotelAmenityService,
  deleteHotelAmenityService,
};
