const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const Room = require("../models/room");

async function createRoom(req, res) {
  try {
    const {
      price_per_night,
      capacity,
      room_type,
      room_images,
      room_description,
      room_amenity_id,
    } = req.body;

    const room = await Room.create({
      price_per_night,
      capacity,
      room_type,
      room_images,
      room_description,
      room_amenity_id,
    });

    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRooms(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const rooms = await sequelize.query(
      `
      SELECT 
        r."room_id",
        r."room_type",
        r."price_per_night",
        r."capacity",
        r."room_images",
        r."room_description"
      FROM "Room" AS r
      
      ORDER BY r."room_id" ASC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit, offset },
        type: QueryTypes.SELECT,
      }
    );

    const totalRooms = await Room.count();

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalRooms / limit),
      totalRooms,
      rooms,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRoomById(req, res) {
  try {
    const { id } = req.params;

    const room = await sequelize.query(
      `
      SELECT 
        r."room_id",
        r."room_type",
        r."price_per_night",
        r."capacity",
        r."room_images",
        r."room_description",
        ra."room_amenity_id",
        ra."room_amenity_name",
        ra."room_amenity_images"
      FROM "Room" AS r
      LEFT JOIN "Room_Amenity" AS ra
      ON r."room_amenity_id" = ra."room_amenity_id"
      WHERE r."room_id" = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (!room || room.length === 0)
      return res.status(404).json({ error: "Room not found" });

    res.status(200).json({ success: true, room: room[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRoom(req, res) {
  try {
    const { price_per_night, capacity, room_type, room_images } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    await room.update({
      price_per_night,
      capacity,
      room_type,
      room_images,
    });

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteRoom(req, res) {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    await room.destroy();
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
