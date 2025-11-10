const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");
const Booking = require("../models/Booking");
const Booking_Details = require("../models/BookingDetails");
const Room = require("../models/Room");
const Customer = require("../models/Customer");
const { isRoomAvailable } = require("./RoomAvailability");
const { calculateTotalPrice } = require("./BookingCalculation");
const jwt = require("jsonwebtoken");

/**
 * Create a new booking (registered or guest)
 */
async function createBookingService(body, token) {
  const t = await sequelize.transaction();
  try {
    const { checkIn_date, checkOut_date, rooms, num_guest } = body;

    if (!rooms || rooms.length === 0)
      throw new Error("At least one room must be selected");
    if (!checkIn_date || !checkOut_date || !num_guest)
      throw new Error("Check-in, check-out, and number of guests are required");

    let customer_id;
    let customer;

    // If token exists, get customer
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        customer = await Customer.findByPk(decoded.id);
        if (!customer) throw new Error("Customer not found");
        customer_id = customer.customer_id;
      } catch {
        // invalid token
      }
    }

    // If no customer_id, create guest customer
    if (!customer_id) {
      const { firstname, lastname, email, phone_no, nationality, citizenship } =
        body;

      if (
        !firstname ||
        !lastname ||
        !email ||
        !phone_no ||
        !nationality ||
        !citizenship
      ) {
        throw new Error(
          "Guest must provide firstname, lastname, email, phone number, nationality, and citizenship"
        );
      }

      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer && !existingCustomer.guestCheckout) {
        throw new Error(
          "This email belongs to a registered user. Please log in."
        );
      }

      customer =
        existingCustomer ||
        (await Customer.create({
          firstname,
          lastname,
          email,
          phone_no,
          guestCheckout: true,
          nationality,
          citizenship,
          password: null,
        }));

      customer_id = customer.customer_id;
    }

    // Check room availability
    for (const { room_id } of rooms) {
      const available = await isRoomAvailable(
        room_id,
        checkIn_date,
        checkOut_date
      );
      if (!available) throw new Error(`Room ${room_id} is already booked`);
    }

    // Create booking
    const booking = await Booking.create(
      {
        checkIn_date,
        checkOut_date,
        status: "pending",
        total_price: 0,
        num_guest,
        customer_id,
      },
      { transaction: t }
    );

    // Add rooms to booking and mark rooms as booked
    for (const { room_id, offer_id } of rooms) {
      await Booking_Details.create(
        {
          booking_id: booking.booking_id,
          room_id,
          offer_id: offer_id || null,
        },
        { transaction: t }
      );

      await Room.update(
        { room_status: "booked" },
        { where: { room_id }, transaction: t }
      );
    }

    const total_price = await calculateTotalPrice(booking.booking_id, t);

    await t.commit();

    return { booking, total_price, guestCheckout: customer.guestCheckout };
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

/**
 * Fetch booking by ID
 */
async function getBookingByIdService(id) {
  const query = `
    SELECT 
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
    GROUP BY b."booking_id", c."firstname", c."lastname", c."email';
  `;

  const booking = await sequelize.query(query, {
    replacements: { id },
    type: QueryTypes.SELECT,
  });
  if (!booking || booking.length === 0) throw new Error("Booking not found");

  return booking[0];
}


async function getAllBookingsService(pageNumber = 1, limit = 10) {
  const offset = (pageNumber - 1) * limit;

  const query = `
    SELECT 
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
  `;

  const bookings = await sequelize.query(query, {
    replacements: { limit, offset },
    type: QueryTypes.SELECT,
  });
  return bookings;
}

async function updateBookingService(id, data) {
  const booking = await Booking.findByPk(id);
  if (!booking) throw new Error("Booking not found");

  const {
    checkIn_date,
    checkOut_date,
    status,
    total_price,
    num_guest,
    customer_id,
  } = data;

  await booking.update({
    checkIn_date,
    checkOut_date,
    status,
    total_price,
    num_guest,
    customer_id,
  });

  return booking;
}

/**
 * Delete a booking
 */
async function deleteBookingService(id) {
  const booking = await Booking.findByPk(id);
  if (!booking) throw new Error("Booking not found");

  await booking.destroy();
  return true;
}

module.exports = {
  createBookingService,
  getBookingByIdService,
  getAllBookingsService,
  updateBookingService,
  deleteBookingService,
};
