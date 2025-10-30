const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

/**
 * Fetch full booking history for a given customer ID
 */
async function fetchBookingHistory(customer_id) {
  const query = `
    SELECT 
      b."booking_id",
      TO_CHAR(b."checkIn_date", 'YYYY-MM-DD') AS "checkIn_date",
      TO_CHAR(b."checkOut_date", 'YYYY-MM-DD') AS "checkOut_date",
      b."status",
      b."total_price",
      json_agg(
        json_build_object(
          'room_id', r."room_id",
          'room_no', r."room_no",
          'category_name', rc."category_name",
          'price_per_night', rc."price_per_night"
        )
      ) AS rooms
    FROM "Booking" b
    LEFT JOIN "Booking_Details" bd ON bd."booking_id" = b."booking_id"
    LEFT JOIN "Room" r ON bd."room_id" = r."room_id"
    LEFT JOIN "Room_Category" rc ON r."room_category_id" = rc."room_category_id"
    WHERE b."customer_id" = :customer_id
    GROUP BY b."booking_id"
    ORDER BY b."checkIn_date" DESC;
  `;

  const history = await sequelize.query(query, {
    replacements: { customer_id },
    type: QueryTypes.SELECT,
  });

  return history;
}

/**
 * Fetch booking summary (without room details) for a given customer ID
 */
async function fetchBookingSummary(customer_id) {
  const query = `
    SELECT 
      b."booking_id",
      TO_CHAR(b."checkIn_date", 'YYYY-MM-DD') AS "checkIn_date",
      TO_CHAR(b."checkOut_date", 'YYYY-MM-DD') AS "checkOut_date",
      b."status",
      b."total_price",
      b."num_guest"
    FROM "Booking" b
    WHERE b."customer_id" = :customer_id
    ORDER BY b."checkIn_date" DESC;
  `;

  const summary = await sequelize.query(query, {
    replacements: { customer_id },
    type: QueryTypes.SELECT,
  });

  return summary;
}

module.exports = {
  fetchBookingHistory,
  fetchBookingSummary,
};
