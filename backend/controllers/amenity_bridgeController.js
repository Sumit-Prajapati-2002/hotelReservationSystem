const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function addAmenitiesToCategories(req, res) {
  const { room_category_id, room_amenity_id } = req.body;
  try {
    const [result] = await sequelize.query(
      `INSERT INTO "Amenity_Bridge" (room_category_id, room_amenity_id)
       VALUES ($1, $2)
       RETURNING *`,
      {
        bind: [room_category_id, room_amenity_id],
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).json({ message: "Amenity added to category", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAmenitiesByCategory(req, res) {
  const { room_category_id } = req.params;
  try {
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
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeAmenityFromCategory(req, res) {
  const { room_category_id, room_amenity_id } = req.body;
  try {
    await sequelize.query(
      `DELETE FROM "Amenity_Bridge"
       WHERE room_category_id = $1 AND room_amenity_id = $2`,
      {
        bind: [room_category_id, room_amenity_id],
        type: QueryTypes.DELETE,
      }
    );
    res.status(200).json({ message: "Amenity removed from category" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addAmenitiesToCategories,
  getAmenitiesByCategory,
  removeAmenityFromCategory,
};
