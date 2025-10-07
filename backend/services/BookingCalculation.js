const sequelize = require("../services/database");
const Booking = require("../models/Booking");
const { QueryTypes } = require("sequelize");

async function calculateTotalPrice(booking_id, transaction = null) {
  try {
    const bookingItems = await sequelize.query(
      `
      SELECT 
        r."price_per_night",
        COALESCE(p."discount_percent", 0) AS discount,
        b."checkIn_date",
        b."checkOut_date"
      FROM "Booking_Details" bd
      JOIN "Room" r ON bd."room_id" = r."room_id"
      JOIN "Booking" b ON bd."booking_id" = b."booking_id"
      LEFT JOIN "Promos_and_Offers" p ON bd."offer_id" = p."offer_id"
      WHERE b."booking_id" = :booking_id
      `,
      { replacements: { booking_id }, type: QueryTypes.SELECT, transaction }
    );

    if (!bookingItems || bookingItems.length === 0) return 0;

    let totalPrice = 0;

    for (const item of bookingItems) {
      const checkIn = new Date(item.checkIn_date);
      const checkOut = new Date(item.checkOut_date);
      const nights = Math.max(
        1,
        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      );

      const priceAfterDiscount = item.price_per_night * (1 - item.discount / 100);
      totalPrice += priceAfterDiscount * nights;
    }


    if (transaction) {
      await Booking.update(
        { total_price: totalPrice },
        { where: { booking_id }, transaction }
      );
    } else {
      await Booking.update(
        { total_price: totalPrice },
        { where: { booking_id } }
      );
    }

    return totalPrice;
  } catch (err) {
    throw new Error("Error calculating total price: " + err.message);
  }
}

module.exports = { calculateTotalPrice };
