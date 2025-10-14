const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function calculateOfferPrice(room_category_id) {
  try {
    const [room] = await sequelize.query(
      `
      SELECT 
        rc."room_category_id",
        rc."price_per_night",
        o."discount_percent",
        o."start_date",
        o."end_date",
        o."is_active"
      FROM "Room_Category" rc
      LEFT JOIN "Offer" o ON rc."offer_id" = o."offer_id"
      WHERE rc."room_category_id" = :room_category_id
      `,
      {
        replacements: { room_category_id },
        type: QueryTypes.SELECT,
      }
    );

    if (!room) {
      throw new Error("Room category not found");
    }

    const {
      price_per_night,
      discount_percent,
      start_date,
      end_date,
      is_active,
    } = room;

    const now = new Date();
    let validDiscount = 0;

    if (
      discount_percent != null &&
      is_active === true &&
      new Date(start_date) <= now &&
      now <= new Date(end_date)
    ) {
      validDiscount = discount_percent;
    }

    const finalPrice = price_per_night * (1 - validDiscount / 100);

    return {
      room_category_id,
      basePrice: price_per_night,
      discountPercent: validDiscount,
      finalPricePerNight: parseFloat(finalPrice.toFixed(2)),
    };
  } catch (err) {
    throw new Error("Error calculating offer price: " + err.message);
  }
}

module.exports = { calculateOfferPrice };
