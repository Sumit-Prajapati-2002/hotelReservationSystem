const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const Room = require("../models/Room");
const { calculateOfferPrice } = require("../services/offerCalculator");

// ✅ Create room
async function createRoomService(data, file, req) {
  let {
    room_no,
    room_description,
    room_status,
    room_category_id,
    room_capacity,
  } = data;

  if (!room_no || !room_category_id)
    throw new Error("room_no and room_category_id are required");

  room_category_id = Number(room_category_id);
  if (isNaN(room_category_id)) throw new Error("Invalid room_category_id");

  const imageUrl = file
    ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    : null;

  const room = await Room.create({
    room_no,
    room_description: room_description || null,
    room_status: room_status || "Available",
    room_category_id,
    room_capacity: room_capacity || null,
    room_image: imageUrl,
  });

  return room;
}

// ✅ Update room
async function updateRoomService(id, data, file, req) {
  const room = await Room.findByPk(Number(id));
  if (!room) throw new Error("Room not found");

  let categoryId = room.room_category_id;
  if (data.room_category_id !== undefined) {
    categoryId = Number(data.room_category_id);
    if (isNaN(categoryId)) throw new Error("Invalid room_category_id");
  }

  const imageUrl = file
    ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    : room.room_image;

  await room.update({
    room_no: data.room_no || room.room_no,
    room_description: data.room_description || room.room_description,
    room_status: data.room_status || room.room_status,
    room_category_id: categoryId,
    room_capacity: data.room_capacity || room.room_capacity,
    room_image: imageUrl,
  });

  return room;
}

// ✅ Get all rooms
async function getRoomsService() {
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
    `,
    { type: QueryTypes.SELECT }
  );

  const roomsWithOffers = await Promise.all(
    rooms.map(async (room) => {
      const offerData = await calculateOfferPrice(room.room_category_id);
      return {
        ...room,
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPricePerNight,
        },
        finalPrice: offerData.finalPricePerNight,
      };
    })
  );

  return roomsWithOffers;
}

// ✅ Get single room by ID
async function getRoomByIdService(id) {
  const roomId = Number(id);
  if (isNaN(roomId)) throw new Error("Invalid room ID");

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
    WHERE r."room_id" = :roomId
    `,
    { replacements: { roomId }, type: QueryTypes.SELECT }
  );

  if (!rooms || rooms.length === 0) throw new Error("Room not found");

  const data = rooms[0];
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
  const roomId = Number(id);
  if (isNaN(roomId)) throw new Error("Invalid room ID");

  const room = await Room.findByPk(roomId);
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
