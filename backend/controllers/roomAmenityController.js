const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

// ✅ Create Amenity
async function createRoomAmenity(req, res) {
  try {
    const { room_amenity_name, room_amenity_description } = req.body;

    if (!room_amenity_name)
      return res.status(400).json({ error: "Amenity name is required" });

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

    res.status(201).json({ success: true, amenity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get all amenities
async function getAllRoomAmenities(req, res) {
  try {
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

    res.status(200).json({ success: true, amenities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get by ID
async function getRoomAmenityById(req, res) {
  try {
    const { id } = req.params;

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
      return res.status(404).json({ error: "Room Amenity not found" });

    res.status(200).json({ success: true, amenity: amenity[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Update
async function updateRoomAmenity(req, res) {
  try {
    const { id } = req.params;
    const { room_amenity_name, room_amenity_description } = req.body;

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
      return res.status(404).json({ error: "Room Amenity not found" });

    res.status(200).json({ success: true, amenity: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Delete
async function deleteRoomAmenity(req, res) {
  try {
    const { id } = req.params;

    const deleted = await sequelize.query(
      `
      DELETE FROM "Room_Amenity"
      WHERE room_amenity_id = :id
      RETURNING *;
      `,
      { replacements: { id }, type: QueryTypes.DELETE }
    );

    if (!deleted || deleted.length === 0)
      return res.status(404).json({ error: "Room Amenity not found" });

    res.status(200).json({
      success: true,
      message: "Room Amenity deleted successfully",
    });
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
