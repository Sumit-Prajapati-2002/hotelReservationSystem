const Booking_History = require("../models/Booking_History");
const Customer = require("../models/customer");
const Booking = require("../models/Booking");
const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function createBookingHistory(req, res) {
  try {
    const { customer_id, booking_id } = req.body;

    const bookingHistory = await Booking_History.create({
      customer_id,
      booking_id,
    });

    res.status(201).json({ success: true, bookingHistory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllBookingHistories(req, res) {
  try {
    const histories = await sequelize.query(
      `SELECT 
         bh."history_id",
         bh."customer_id",
         bh."booking_id",
         c."firstname" AS customer_firstname,
         c."lastname" AS customer_lastname,
         c."email" AS customer_email,
         b."checkIn_date",
         b."checkOut_date",
         b."status",
         b."total_price",
         b."num_guest"
       FROM "Booking_history" AS bh
       LEFT JOIN "Customer" AS c ON bh."customer_id" = c."customer_id"
       LEFT JOIN "Booking" AS b ON bh."booking_id" = b."booking_id"`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ success: true, histories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingHistoryById(req, res) {
  try {
    const { id } = req.params;
    const history = await sequelize.query(
      `SELECT 
         bh."booking_history_id",
         bh."customer_id",
         bh."booking_id",
         c."firstname" AS customer_firstname,
         c."lastname" AS customer_lastname,
         c."email" AS customer_email,
         b."checkIn_date",
         b."checkOut_date",
         b."status",
         b."total_price",
         b."num_guest"
       FROM "Booking_History" AS bh
       LEFT JOIN "Customer" AS c ON bh."customer_id" = c."customer_id"
       LEFT JOIN "Booking" AS b ON bh."booking_id" = b."booking_id"
       WHERE bh."booking_history_id" = :id`,
      { type: QueryTypes.SELECT, replacements: { id } }
    );

    if (!history.length) {
      return res.status(404).json({ error: "Booking history not found" });
    }

    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBookingHistory(req, res) {
  try {
    const { id } = req.params;
    const { customer_id, booking_id } = req.body;

    const history = await Booking_History.findByPk(id);

    if (!history) {
      return res.status(404).json({ error: "Booking history not found" });
    }

    await history.update({ customer_id, booking_id });

    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBookingHistory(req, res) {
  try {
    const { id } = req.params;
    const history = await Booking_History.findByPk(id);

    if (!history) {
      return res.status(404).json({ error: "Booking history not found" });
    }

    await history.destroy();
    res.status(200).json({ success: true, message: "Booking history deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBookingHistory,
  getAllBookingHistories,
  getBookingHistoryById,
  updateBookingHistory,
  deleteBookingHistory,
};
