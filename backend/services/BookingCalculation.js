const sequelize = require("../services/database");
const Booking = require("../models/Booking");
const { QueryTypes } = require("sequelize");

async function calculateTotalPrice(booking_id, transaction = null) {
  try {
    const bookingItems = await sequelize.query(
      `
      SELECT 
        rc."room_category_id",
        rc."price_per_night",
        o."discount_percent",
        o."start_date",
        o."end_date",
        o."is_active",
        b."checkIn_date",
        b."checkOut_date"
      FROM "Booking_Details" bd
      JOIN "Room" r ON bd."room_id" = r."room_id"
      JOIN "Room_Category" rc ON r."room_category_id" = rc."room_category_id"
      JOIN "Booking" b ON bd."booking_id" = b."booking_id"
      LEFT JOIN "Offer" o ON rc."offer_id" = o."offer_id"
      WHERE b."booking_id" = :booking_id
      `,
      { replacements: { booking_id }, type: QueryTypes.SELECT, transaction }
    );

    if (!bookingItems || bookingItems.length === 0) return 0;

    let totalPrice = 0;
    const now = new Date();

    for (const item of bookingItems) {
      const checkIn = new Date(item.checkIn_date);
      const checkOut = new Date(item.checkOut_date);
      const nights = Math.max(
        1,
        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      );

      // Calculate price after offer discount
      let discountPercent = 0;
      if (
        item.discount_percent &&
        item.is_active &&
        now >= new Date(item.start_date) &&
        now <= new Date(item.end_date)
      ) {
        discountPercent = item.discount_percent;
      }

      const finalPrice = item.price_per_night * (1 - discountPercent / 100);
      totalPrice += finalPrice * nights;
    }

    await Booking.update(
      { total_price: totalPrice },
      { where: { booking_id }, transaction }
    );

    return totalPrice;
  } catch (err) {
    throw new Error("Error calculating total price: " + err.message);
  }
}

module.exports = { calculateTotalPrice };
