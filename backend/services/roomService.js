const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const Room = require("../models/room");
const { calculateOfferPrice } = require("../services/offerCalculator");

// ✅ Create room
async function createRoomService(data, file, req) {
  const {
    room_no,
    room_description,
    room_status,
    room_category_id,
    room_capacity,
  } = data;

  if (!room_no || !room_category_id) {
    throw new Error("room_no and room_category_id are required");
  }

  // Handle image upload
  let imageUrl = null;
  if (file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }

  const room = await Room.create({
    room_no,
    room_description: room_description || null,
    room_status: room_status || "available",
    room_category_id,
    room_capacity: room_capacity || null,
    room_image: imageUrl,
  });

  return room;
}

// ✅ Update room
async function updateRoomService(id, data, file, req) {
  const { room_no, room_description, room_status, room_category_id } = data;

  const room = await Room.findByPk(id);
  if (!room) throw new Error("Room not found");

  let imageUrl = room.room_image;
  if (file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }

  await room.update({
    room_no: room_no || room.room_no,
    room_description: room_description || room.room_description,
    room_status: room_status || room.room_status,
    room_category_id: room_category_id || room.room_category_id,
    room_image: imageUrl,
  });

  return room;
}

// ✅ Get paginated rooms
async function getRoomsService(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const rooms = await sequelize.query(
    `
    SELECT 
      r."room_id",
      r."room_no",
      r."room_status",
      r."room_description",
      r."room_image",
      rc."room_category_id",
      rc."category_name",
      r."room_capacity",
      rc."price_per_night" AS category_price
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

  // Add offers
  const roomsWithOffers = await Promise.all(
    rooms.map(async (room) => {
      const offerData = await calculateOfferPrice(room.room_category_id);
      return {
        ...room,
        category_price: room.category_price,
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPricePerNight,
        },
        finalPrice: offerData.finalPricePerNight,
      };
    })
  );

  const totalRooms = await Room.count();

  return {
    currentPage: page,
    totalPages: Math.ceil(totalRooms / limit),
    totalRooms,
    rooms: roomsWithOffers,
  };
}

// ✅ Get single room by ID
async function getRoomByIdService(id) {
  const room = await sequelize.query(
    `
    SELECT 
      r."room_id",
      r."room_no",
      r."room_status",
      r."room_description",
      rc."room_category_id",
      rc."category_name",
      r."room_capacity",
      rc."price_per_night" AS category_price,
      rc."category_description"
    FROM "Room" AS r
    LEFT JOIN "Room_Category" AS rc
    ON r."room_category_id" = rc."room_category_id"
    WHERE r."room_id" = :id
    `,
    { replacements: { id }, type: QueryTypes.SELECT }
  );

  if (!room || room.length === 0) throw new Error("Room not found");

  const data = room[0];
  const offerData = await calculateOfferPrice(data.room_category_id);

  return {
    ...data,
    offer: {
      discountPercent: offerData.discountPercent,
      finalPrice: offerData.finalPrice,
    },
  };
}

// ✅ Delete room
async function deleteRoomService(id) {
  const room = await Room.findByPk(id);
  if (!room) throw new Error("Room not found");

  await room.destroy();
  return { message: "Room deleted successfully" };
}

module.exports = {
  createRoomService,
  updateRoomService,
  getRoomsService,
  getRoomByIdService,
  deleteRoomService,
};
