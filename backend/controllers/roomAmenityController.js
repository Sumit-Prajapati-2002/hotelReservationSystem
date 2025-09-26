const Room_Amenity = require("../models/room_amenity");

const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function createRoomAmenity(req, res) {
  try {
    const { room_id, room_amenity_name, room_amenity_images } = req.body;

    const roomAmenity = await Room_Amenity.create({
      room_id,
      room_amenity_name,
      room_amenity_images,
    });

    res.status(201).json({ success: true, roomAmenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllRoomAmenities(req, res) {
  try {
    const amenities = await sequelize.query(
      `SELECT 
         ra."room_amenity_id",
         ra."room_amenity_name",
         ra."room_amenity_images",
         r."room_id",
         r."room_type"
       FROM "Room_Amenity" AS ra
       LEFT JOIN "Room" AS r
       ON ra."room_id" = r."room_id"`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ success: true, amenities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRoomAmenityById(req, res) {
  try {
    const { id } = req.params;
    const amenity = await sequelize.query(
      `SELECT 
         ra."room_amenity_id",
         ra."room_amenity_name",
         ra."room_amenity_images",
         r."room_id",
         r."room_type"
       FROM "Room_Amenity" AS ra
       LEFT JOIN "Room" AS r
       ON ra."room_id" = r."room_id"
       WHERE ra."room_amenity_id" = :id`,
      {
        type: QueryTypes.SELECT,
        replacements: { id },
      }
    );

    if (!amenity || amenity.length === 0) {
      return res.status(404).json({ error: "Room Amenity not found" });
    }

    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRoomAmenity(req, res) {
  try {
    const { id } = req.params;
    const { room_id, room_amenity_name, room_amenity_images } = req.body;

    const amenity = await Room_Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ error: "Room Amenity not found" });
    }

    await amenity.update({
      room_id,
      room_amenity_name,
      room_amenity_images,
    });

    res.status(200).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteRoomAmenity(req, res) {
  try {
    const { id } = req.params;
    const amenity = await Room_Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ error: "Room Amenity not found" });
    }

    await amenity.destroy();
    res.status(200).json({ success: true, message: "Room Amenity deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoomAmenity,
  getAllRoomAmenities,
  getRoomAmenityById,
  updateRoomAmenity,
  deleteRoomAmenity,
};
