const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function isRoomAvailable(room_id, checkIn_date, checkOut_date) {
  try {
    const res = await sequelize.query(
      `
      SELECT CASE 
               WHEN EXISTS (
                 SELECT 1
                 FROM "Booking_Details" bd
                 JOIN "Booking" b ON bd."booking_id" = b."booking_id"
                 WHERE bd."room_id" = :room_id
                   AND NOT (b."checkOut_date" <= :checkIn_date OR b."checkIn_date" >= :checkOut_date)
                   AND b."status" != 'canceled'
               ) THEN false
               ELSE true
             END AS available
      `,
      {
        replacements: { room_id, checkIn_date, checkOut_date },
        type: QueryTypes.SELECT,
      }
    );

    return res[0].available; // true if room is free, false if booked
  } catch (err) {
    throw new Error("Error checking room availability: " + err.message);
  }
}

module.exports = { isRoomAvailable };
