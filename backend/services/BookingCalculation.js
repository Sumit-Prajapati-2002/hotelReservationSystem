// services/BookingCalculation.js
const sequelize = require("../services/database");
const Booking = require("../models/Booking");
const { QueryTypes } = require("sequelize");

async function calculateTotalPrice(booking_id) {
  
  const bookingInfo = await sequelize.query(
    `SELECT 
       b."checkIn_date",
       b."checkOut_date",
       r."price_per_night"
     FROM "Booking_Details" bd
     JOIN "Room" r ON bd."room_id" = r."room_id"
     JOIN "Booking" b ON bd."booking_id" = b."booking_id"
     WHERE b."booking_id" = :booking_id`,
    { replacements: { booking_id }, type: QueryTypes.SELECT }
  );

  if (!bookingInfo || bookingInfo.length === 0) return 0;

  let totalPrice = 0;

  for (const item of bookingInfo) {
    const checkIn = new Date(item.checkIn_date);
    const checkOut = new Date(item.checkOut_date);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    totalPrice += item.price_per_night * nights;
  }

  
  await Booking.update(
    { total_price: totalPrice },
    { where: { booking_id } }
  );

  return totalPrice;
}

module.exports = { calculateTotalPrice };
