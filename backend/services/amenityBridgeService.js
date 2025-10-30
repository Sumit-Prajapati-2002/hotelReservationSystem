const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function addAmenityToCategory(room_category_id, room_amenity_id) {
  const [result] = await sequelize.query(
    `INSERT INTO "Amenity_Bridge" (room_category_id, room_amenity_id)
     VALUES ($1, $2)
     RETURNING *`,
    {
      bind: [room_category_id, room_amenity_id],
      type: QueryTypes.INSERT,
    }
  );
  return result;
}

async function getAmenitiesByCategory(room_category_id) {
  const amenities = await sequelize.query(
    `SELECT a.room_amenity_id, a.room_amenity_name, a.room_amenity_description
     FROM "Amenity_Bridge" ab
     JOIN "Amenity" a ON ab.room_amenity_id = a.room_amenity_id
     WHERE ab.room_category_id = $1`,
    {
      bind: [room_category_id],
      type: QueryTypes.SELECT,
    }
  );
  return amenities;
}

async function removeAmenityFromCategory(room_category_id, room_amenity_id) {
  await sequelize.query(
    `DELETE FROM "Amenity_Bridge"
     WHERE room_category_id = $1 AND room_amenity_id = $2`,
    {
      bind: [room_category_id, room_amenity_id],
      type: QueryTypes.DELETE,
    }
  );
  return { message: "Amenity removed successfully" };
}

module.exports = {
  addAmenityToCategory,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
};
