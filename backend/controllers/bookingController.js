const Booking = require("../models/Booking");

const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
async function createBooking(req, res) {
  try {
    const {
      checkIn_date,
      checkOut_date,
      status,
      total_price,
      num_guest,
      customer_id,
    } = req.body;

    const booking = await Booking.create({
      checkIn_date,
      checkOut_date,
      status,
      total_price: 0,
      num_guest,
      customer_id,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingById(req, res) {
  try {
    const { id } = req.params;

    const booking = await sequelize.query(
      `SELECT 
         b."booking_id",
         b."checkIn_date",
         b."checkOut_date",
         b."status",
         b."total_price",
         b."num_guest",
         c."firstname" AS "customer_firstname", 
         c."lastname" AS "customer_lastname", 
         c."email" AS "customer_email",
         json_agg(
          json_build_object(
            'booking_details_id', bd."booking_details_id",
            'room_id', bd."room_id",
            'offer_id', bd."offer_id"
          )
        ) AS details
       FROM "Booking" AS b
       LEFT JOIN "Customer" AS c ON b."customer_id" = c."customer_id"
       LEFT JOIN "Booking_Details" AS bd ON bd."booking_id" = b."booking_id"
       WHERE b."booking_id" = :id
        GROUP BY b."booking_id", c."firstname", c."lastname", c."email"`,
      { replacements: { id }, type: QueryTypes.SELECT }
    );

    if (!booking || booking.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllBookings(req, res) {
  try {
    const bookings = await sequelize.query(
      `SELECT 
         b."booking_id", 
         b."checkIn_date", 
         b."checkOut_date", 
         b."status", 
         b."total_price", 
         b."num_guest",
         c."firstname" AS "customer_firstname", 
         c."lastname" AS "customer_lastname", 
         c."email" AS "customer_email",
         bd."booking_details_id",
         bd."room_id", 
         bd."offer_id"
       FROM "Booking" AS b
       LEFT JOIN "Customer" AS c ON b."customer_id" = c."customer_id"
       LEFT JOIN "Booking_Details" AS bd ON bd."booking_id" = b."booking_id"`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function updateBooking(req, res) {
  try {
    const { id } = req.params;
    const {
      checkIn_date,
      checkOut_date,
      status,
      total_price,
      num_guest,
      customer_id,
      booking_details_id,
    } = req.body;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.update({
      checkIn_date,
      checkOut_date,
      status,
      total_price,
      num_guest,
      customer_id,
      booking_details_id,
    });

    res.status(200).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBooking(req, res) {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.destroy();
    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
