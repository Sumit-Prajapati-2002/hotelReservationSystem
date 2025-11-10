const Booking_Details = require("../models/BookingDetails");
const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const { calculateTotalPrice } = require("../services/BookingCalculation");

// async function createBookingDetails(req, res) {
//   try {
//     const { booking_id, room_id, offer_id } = req.body;

//     const bookingDetail = await Booking_Details.create({
//       booking_id,
//       room_id,
//       offer_id,
//     });
//     const total_Price = await calculateTotalPrice(booking_id);
//     res
//       .status(201)
//       .json({ success: true, bookingDetail, totalPrice: total_Price });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

async function getAllBookingDetails(req, res) {
  try {
    const bookingDetails = await sequelize.query(
      `SELECT
        bd."booking_details_id",
        b."booking_id",
        b."checkIn_date",
        b."checkOut_date",
        c."firstname" AS customer_firstname,
        c."lastname" AS customer_lastname,
        c."email" AS customer_email,
        r."room_type",
        o."offer_title",
        o."discount_percent"
      FROM "Booking_Details" AS bd
      LEFT JOIN "Booking" AS b ON bd."booking_id" = b."booking_id"
      LEFT JOIN "Customer" AS c ON b."customer_id" = c."customer_id"
      LEFT JOIN "Room" AS r ON bd."room_id" = r."room_id"
      LEFT JOIN "Promos_and_Offers" AS o ON bd."offer_id" = o."offer_id"`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json({ success: true, bookingDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingDetailsById(req, res) {
  try {
    const { id } = req.params;

    const bookingDetails = await sequelize.query(
      `SELECT
    b."booking_id",
    b."checkIn_date",
    b."checkOut_date",
    b."status",
    b."total_price",
    b."num_guest",
    c."firstname" AS customer_firstname,
    c."lastname" AS customer_lastname,
    c."email" AS customer_email,
    COALESCE(
      json_agg(
        json_build_object(
          'booking_details_id', bd."booking_details_id",
          'room_id', bd."room_id",
          'room_type', r."room_type",
          'price_per_night', r."price_per_night",
          'capacity', r."capacity",
          'offer_id', bd."offer_id",
          'offer_title', o."offer_title",
          'discount_percent', o."discount_percent"
        )
      ) FILTER (WHERE bd."booking_details_id" IS NOT NULL),
      '[]'
    ) AS details
  FROM "Booking" AS b
  LEFT JOIN "Customer" AS c ON b."customer_id" = c."customer_id"
  LEFT JOIN "Booking_Details" AS bd ON bd."booking_id" = b."booking_id"
  LEFT JOIN "Room" AS r ON bd."room_id" = r."room_id"
  LEFT JOIN "Promos_and_Offers" AS o ON bd."offer_id" = o."offer_id"
  WHERE b."booking_id" = :id
  GROUP BY b."booking_id", c."firstname", c."lastname", c."email"`,
      { replacements: { id }, type: QueryTypes.SELECT }
    );

    if (!bookingDetails || bookingDetails.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ success: true, booking: bookingDetails[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBookingDetails(req, res) {
  try {
    const { id } = req.params;
    const { booking_id, room_id, offer_id } = req.body;

    const bookingDetail = await Booking_Details.findByPk(id);

    if (!bookingDetail) {
      return res.status(404).json({ error: "Booking Detail not found" });
    }

    await bookingDetail.update({ booking_id, room_id, offer_id });
    const total_Price = await calculateTotalPrice(booking_id);

    res
      .status(200)
      .json({ success: true, bookingDetail, totalPrice: total_Price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBookingDetails(req, res) {
  try {
    const { id } = req.params;
    const bookingDetail = await Booking_Details.findByPk(id);

    if (!bookingDetail) {
      return res.status(404).json({ error: "Booking Detail not found" });
    }

    await bookingDetail.destroy();
    res.status(200).json({ success: true, message: "Booking Detail deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  // createBookingDetails,
  getAllBookingDetails,
  getBookingDetailsById,
  updateBookingDetails,
  deleteBookingDetails,
};
