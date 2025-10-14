const jwt = require("jsonwebtoken");
const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
async function getCustomerById(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.id;
    const history = await sequelize.query(
      `
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
      ORDER BY b."checkIn_date" DESC
      `,
      {
        replacements: { customer_id },
        type: QueryTypes.SELECT,
      }
    );
    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No booking history found" });
    }

    res.status(200).json({ success: true, history });
  } catch (err) {
    console.error("Error fetching booking history:", err);
    res.status(500).json({ error: err.message });
  }
}
async function getCustomerBookingsSummary(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token found" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.id;

    // Query only summary details (no room join)
    const summary = await sequelize.query(
      `
      SELECT 
        b."booking_id",
        TO_CHAR(b."checkIn_date", 'YYYY-MM-DD') AS "checkIn_date",
        TO_CHAR(b."checkOut_date", 'YYYY-MM-DD') AS "checkOut_date",
        b."status",
        b."total_price",
        b."num_guest"
      FROM "Booking" b
      WHERE b."customer_id" = :customer_id
      ORDER BY b."checkIn_date" DESC
      `,
      {
        replacements: { customer_id },
        type: QueryTypes.SELECT,
      }
    );

    if (!summary || summary.length === 0) {
      return res.status(404).json({ message: "No booking history found" });
    }

    res.status(200).json({ success: true, summary });
  } catch (err) {
    console.error("Error fetching booking summary:", err);
    res.status(500).json({ error: err.message });
  }
}
module.exports = { getCustomerById,getCustomerBookingsSummary };
