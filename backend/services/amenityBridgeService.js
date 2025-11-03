const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

// Add single or multiple amenities
async function addAmenityToCategory(room_category_id, room_amenity_ids) {
  if (!Array.isArray(room_amenity_ids)) {
    room_amenity_ids = [room_amenity_ids];
  }

  const results = [];
  for (const amenity_id of room_amenity_ids) {
    const [result] = await sequelize.query(
      `INSERT INTO "Amenity_Bridge" (room_category_id, room_amenity_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      {
        bind: [room_category_id, amenity_id],
        type: QueryTypes.INSERT,
      }
    );
    results.push(result);
  }
  return results;
}

// Get amenities for a category
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

// Remove single or multiple amenities
async function removeAmenityFromCategory(room_category_id, room_amenity_ids) {
  if (!Array.isArray(room_amenity_ids)) {
    room_amenity_ids = [room_amenity_ids];
  }

  await sequelize.query(
    `DELETE FROM "Amenity_Bridge"
     WHERE room_category_id = $1 AND room_amenity_id = ANY($2::int[])`,
    {
      bind: [room_category_id, room_amenity_ids],
      type: QueryTypes.DELETE,
    }
  );

  return { message: "Amenity(s) removed successfully" };
}

module.exports = {
  addAmenityToCategory,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
};
