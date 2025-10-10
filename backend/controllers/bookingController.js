const { calculateTotalPrice } = require("../services/BookingCalculation");
const { isRoomAvailable } = require("../services/RoomAvailability");
const Booking_Details = require("../models/Booking_Details");
const Room = require("../models/room");
const Booking = require("../models/Booking");
const Customer = require("../models/customer");
const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");


async function createBooking(req, res) {
  const t = await sequelize.transaction();
  try {
    const { checkIn_date, checkOut_date, rooms, num_guest } = req.body;

    if (!rooms || rooms.length === 0) {
      return res.status(400).json({ error: "At least one room must be selected" });
    }
    if (!checkIn_date || !checkOut_date || !num_guest) {
      return res.status(400).json({ error: "Check-in, check-out, and number of guests are required" });
    }

    const token = req.cookies.token;
    let customer_id;
    let customer;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        customer = await Customer.findByPk(decoded.id);
        if (!customer) throw new Error("Customer not found");
        customer_id = customer.customer_id;
      } catch (err) {
        console.warn("invalid or expired token")
      }
    }

    if (!customer_id) {
      const { firstname, lastname, email, phone_no, nationality, citizenship } = req.body;

      if (!firstname || !lastname || !email || !phone_no || !nationality || !citizenship) {
        return res.status(400).json({
          error: "Guest must provide firstname, lastname, email, phone number, nationality, and citizenship",
        });
      }

      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer && !existingCustomer.guestCheckout) {
        return res.status(400).json({ error: "This email belongs to a registered user. Please log in." });
      }

      customer = existingCustomer || await Customer.create({
        firstname,
        lastname,
        email,
        phone_no,
        guestCheckout: true,
        nationality,
        citizenship,
        password: null,
      });
      customer_id = customer.customer_id;
    }


    for (const { room_id } of rooms) {
      const available = await isRoomAvailable(room_id, checkIn_date, checkOut_date);
      if (!available) {
        return res.status(400).json({ error: `Room ${room_id} is already booked` });
      }
    }


    const booking = await Booking.create({
      checkIn_date,
      checkOut_date,
      status: "pending",
      total_price: 0,
      num_guest,
      customer_id,
    }, { transaction: t });


    for (const { room_id, offer_id } of rooms) {
      await Booking_Details.create({
        booking_id: booking.booking_id,
        room_id,
        offer_id: offer_id || null,
      }, { transaction: t });

      await Room.update(
        { room_status: "booked" },
        { where: { room_id }, transaction: t }
      );
    }


    const total = await calculateTotalPrice(booking.booking_id, t);

    await t.commit();

   
    res.status(201).json({
      success: true,
      booking,
      total_price: total,
      message: customer.guestCheckout
        ? "Guest booking created successfully"
        : "Booking created successfully",
    });

  } catch (err) {
    await t.rollback();
    console.error("Error creating booking:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getBookingById(req, res) {
  try {
    const { id } = req.params;

    const booking = await sequelize.query(
      `SELECT 
         b."booking_id",
         TO_CHAR(b."checkIn_date", 'YYYY-MM-DD') AS "checkIn_date",
         TO_CHAR(b."checkOut_date", 'YYYY-MM-DD') AS "checkOut_date",
         b."status",
         b."total_price",
         b."num_guest",
         c."firstname" AS "customer_firstname",
         c."lastname" AS "customer_lastname",
         c."email" AS "customer_email",
         COALESCE(
           json_agg(
             json_build_object(
               'room_id', r."room_id",
               'category_name', rc."category_name",
               'price_per_night', rc."price_per_night",
               'capacity', rc."capacity",
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
       LEFT JOIN "Room_Category" AS rc ON r."room_category_id" = rc."room_category_id"
       LEFT JOIN "Promos_and_Offers" AS o ON bd."offer_id" = o."offer_id"
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
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (pageNumber - 1) * limit;
    const bookings = await sequelize.query(
      `SELECT 
    b."booking_id",
    TO_CHAR(b."checkIn_date", 'YYYY-MM-DD') AS "checkIn_date",
    TO_CHAR(b."checkOut_date", 'YYYY-MM-DD') AS "checkOut_date",
    b."total_price",
    c."email" AS "customer_email",
    json_agg(
      json_build_object(
        'room_id', r."room_id",
        'room_no', r."room_no",
        'category_name', rc."category_name"
      )
    ) AS rooms
FROM "Booking" b
LEFT JOIN "Customer" c ON b."customer_id" = c."customer_id"
LEFT JOIN "Booking_Details" bd ON bd."booking_id" = b."booking_id"
LEFT JOIN "Room" r ON bd."room_id" = r."room_id"
LEFT JOIN "Room_Category" rc ON r."room_category_id" = rc."room_category_id"
GROUP BY b."booking_id", c."email"
LIMIT :limit OFFSET :offset;
`,
      { replacements: { limit, offset }, type: QueryTypes.SELECT }
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
async function createGuestBooking(req, res) {
  try {
    const {
      firstname,
      lastname,
      email,
      phone_no,
      checkIn_date,
      checkOut_date,
      num_guest,
      nationality,
      citizenship,
    } = req.body;

    let existingCustomer = await Customer.findOne({
      where: { email },
    });

    let customer;

    if (existingCustomer) {
      if (!existingCustomer.guestCheckout) {
        return res
          .status(400)
          .json({ error: "This email is already registered. Please log in." });
      }

      customer = existingCustomer;
    } else {
      customer = await Customer.create({
        firstname,
        lastname,
        email,
        phone_no,
        guestCheckout: true,
        nationality,
        citizenship,
        password: null,
      });
    }

    const booking = await Booking.create({
      checkIn_date,
      checkOut_date,
      status: "pending",
      total_price: 0,
      num_guest,
      customer_id: customer.customer_id,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("Error creating guest booking:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  createGuestBooking,
};
