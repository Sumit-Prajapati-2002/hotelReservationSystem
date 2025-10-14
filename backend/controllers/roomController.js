const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const Room = require("../models/room");
const { calculateOfferPrice } = require("../services/offerCalculator");

async function createRoom(req, res) {
  try {
    const {
      room_no,
      room_description,
      room_status,
      room_category_id,
      room_capacity,
      room_images,
    } = req.body;

    if (!room_no || !room_category_id) {
      return res
        .status(400)
        .json({ error: "room_no and room_category_id are required" });
    }

    const room = await Room.create({
      room_no,
      room_status: room_status || "available",
      room_category_id,
      room_description,
      room_capacity,
      room_images,
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
        r."room_no",
        r."room_status",
        r."room_description",
        rc."room_category_id",
        rc."category_name",
        rc."capacity" AS category_capacity,
        rc."price_per_night" AS category_price,
        rc."category_description"
      FROM "Room" AS r
      LEFT JOIN "Room_Category" AS rc
      ON r."room_category_id" = rc."room_category_id"
      ORDER BY r."room_id" ASC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit, offset },
        type: QueryTypes.SELECT,
      }
    );

    // Apply offer price to each room’s category
    const roomsWithOffers = await Promise.all(
      rooms.map(async (room) => {
        const offerData = await calculateOfferPrice(room.room_category_id);
        return {
          ...room,
          offer: {
            discountPercent: offerData.discountPercent,
            finalPrice: offerData.finalPrice,
          },
        };
      })
    );

    const totalRooms = await Room.count();

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalRooms / limit),
      totalRooms,
      rooms: roomsWithOffers,
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
        r."room_no",
        r."room_status",
        r."room_description",
        rc."room_category_id",
        rc."category_name",
        r."capacity" AS capacity,
        rc."price_per_night" AS category_price,
        rc."category_description"
      FROM "Room" AS r
      LEFT JOIN "Room_Category" AS rc
      ON r."room_category_id" = rc."room_category_id"
      WHERE r."room_id" = :id
      `,
      { replacements: { id }, type: QueryTypes.SELECT }
    );

    if (!room || room.length === 0)
      return res.status(404).json({ error: "Room not found" });

    const data = room[0];

    // Calculate offer for that room’s category
    const offerData = await calculateOfferPrice(data.room_category_id);

    res.status(200).json({
      success: true,
      room: {
        ...data,
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRoom(req, res) {
  try {
    const { room_no, room_description, room_status, room_category_id } =
      req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    await room.update({
      room_no: room_no || room.room_no,
      room_description: room_description || room.room_description,
      room_status: room_status || room.room_status,
      room_category_id: room_category_id || room.room_category_id,
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
