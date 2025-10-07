const { QueryTypes } = require("sequelize");
const sequelize = require("../services/database");

async function isRoomAvailable(room_id, checkIn_date, checkOut_date) {
  try {
    const res = await sequelize.query(
      `
      SELECT 1 FROM "Booking" b
      JOIN "Booking_Details" bd ON b."booking_id" = bd."booking_id"
      WHERE bd."room_id" = :room_id
        AND NOT (b."checkOut_date" <= :checkIn_date OR b."checkIn_date" >= :checkOut_date)
        AND b."status" != 'canceled'
      LIMIT 1
      `,
      {
        replacements: { room_id, checkIn_date, checkOut_date },
        type: QueryTypes.SELECT,
      }
    );
    return res.length === 0;
  } catch (err) {
    throw new Error("Error checking room availability: " + err.message);
  }
}

module.exports = { isRoomAvailable };
