const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

/**
 * Create a new room amenity
 */
async function createRoomAmenity({ room_amenity_name, room_amenity_description }) {
  if (!room_amenity_name) throw new Error("Amenity name is required");

  const [amenity] = await sequelize.query(
    `
    INSERT INTO "Room_Amenity" (room_amenity_name, room_amenity_description)
    VALUES (:room_amenity_name, :room_amenity_description)
    RETURNING *;
    `,
    {
      replacements: { room_amenity_name, room_amenity_description },
      type: QueryTypes.INSERT,
    }
  );

  return amenity;
}

/**
 * Get all room amenities
 */
async function getAllRoomAmenities() {
  const amenities = await sequelize.query(
    `
    SELECT 
      ra."room_amenity_id",
      ra."room_amenity_name",
      ra."room_amenity_description"
    FROM "Room_Amenity" AS ra
    ORDER BY ra."room_amenity_id" ASC;
    `,
    { type: QueryTypes.SELECT }
  );

  if (!amenities || amenities.length === 0)
    throw new Error("No room amenities found");

  return amenities;
}

/**
 * Get a single room amenity by ID
 */
async function getRoomAmenityById(id) {
  const amenity = await sequelize.query(
    `
    SELECT 
      ra."room_amenity_id",
      ra."room_amenity_name",
      ra."room_amenity_description"
    FROM "Room_Amenity" AS ra
    WHERE ra."room_amenity_id" = :id;
    `,
    { replacements: { id }, type: QueryTypes.SELECT }
  );

  if (!amenity || amenity.length === 0)
    throw new Error("Room Amenity not found");

  return amenity[0];
}

/**
 * Update room amenity
 */
async function updateRoomAmenity(id, { room_amenity_name, room_amenity_description }) {
  const [result] = await sequelize.query(
    `
    UPDATE "Room_Amenity"
    SET room_amenity_name = COALESCE(:room_amenity_name, room_amenity_name),
        room_amenity_description = COALESCE(:room_amenity_description, room_amenity_description)
    WHERE room_amenity_id = :id
    RETURNING *;
    `,
    {
      replacements: { id, room_amenity_name, room_amenity_description },
      type: QueryTypes.UPDATE,
    }
  );

  if (!result || result.length === 0)
    throw new Error("Room Amenity not found");

  return result[0];
}

/**
 * Delete room amenity
 */
async function deleteRoomAmenity(id) {
  const deleted = await sequelize.query(
    `
    DELETE FROM "Room_Amenity"
    WHERE room_amenity_id = :id
    RETURNING *;
    `,
    { replacements: { id }, type: QueryTypes.DELETE }
  );

  if (!deleted || deleted.length === 0)
    throw new Error("Room Amenity not found");

  return true;
}

module.exports = {
  createRoomAmenity,
  getAllRoomAmenities,
  getRoomAmenityById,
  updateRoomAmenity,
  deleteRoomAmenity,
};
