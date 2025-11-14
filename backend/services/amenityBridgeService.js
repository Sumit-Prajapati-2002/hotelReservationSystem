const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

// Add multiple amenities to a category
async function addAmenityToCategory(room_category_id, room_amenity_ids) {
  if (!Array.isArray(room_amenity_ids)) room_amenity_ids = [room_amenity_ids];

  const results = [];
  for (const amenity_id of room_amenity_ids) {
    const [result] = await sequelize.query(
      `INSERT INTO "Amenity_Bridge" (room_category_id, room_amenity_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      { bind: [room_category_id, amenity_id], type: QueryTypes.INSERT }
    );
    results.push(result);
  }
  return results;
}

// Get all amenities assigned to a category
async function getAmenitiesByCategory(room_category_id) {
  return await sequelize.query(
    `SELECT a.room_amenity_id, a.room_amenity_name, a.room_amenity_description
     FROM "Amenity_Bridge" ab
     JOIN "Room_Amenity" a ON ab.room_amenity_id = a.room_amenity_id
     WHERE ab.room_category_id = $1`,
    { bind: [room_category_id], type: QueryTypes.SELECT }
  );
}

// Remove amenities from a category
async function removeAmenityFromCategory(room_category_id, room_amenity_ids) {
  if (!Array.isArray(room_amenity_ids)) room_amenity_ids = [room_amenity_ids];

  await sequelize.query(
    `DELETE FROM "Amenity_Bridge"
     WHERE room_category_id = $1 AND room_amenity_id = ANY($2::int[])`,
    { bind: [room_category_id, room_amenity_ids], type: QueryTypes.DELETE }
  );

  return { message: "Amenity(s) removed successfully" };
}

// Replace all amenities for a category (delete old + add new)
async function updateAmenitiesForCategory(room_category_id, room_amenity_ids) {
  // Get currently assigned amenities
  const current = await getAmenitiesByCategory(room_category_id);
  const currentIds = current.map((a) => a.room_amenity_id);

  // Determine which to remove and which to add
  const toRemove = currentIds.filter((id) => !room_amenity_ids.includes(id));
  const toAdd = room_amenity_ids.filter((id) => !currentIds.includes(id));

  if (toRemove.length > 0)
    await removeAmenityFromCategory(room_category_id, toRemove);
  if (toAdd.length > 0) await addAmenityToCategory(room_category_id, toAdd);

  return { message: "Amenities updated successfully" };
}

module.exports = {
  addAmenityToCategory,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
  updateAmenitiesForCategory,
};
