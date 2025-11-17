// services/offerCalculator.js

const Room_Category = require("../models/RoomCategory");
const Offer = require("../models/Offer"); // assuming you have an offer table/model

/**
 * Calculate the offer price for a given room category.
 * Returns an object with discountPercent and finalPrice.
 */
async function calculateOfferPrice(roomCategoryId) {
  // Fetch room category
  const category = await Room_Category.findByPk(roomCategoryId);
  if (!category) throw new Error("Room category not found");

  let discountPercent = 0;
  let finalPrice = category.price_per_night;

  // If category has an offer_id, fetch the offer
  if (category.offer_id) {
    const offer = await Offer.findByPk(category.offer_id);
    if (offer && offer.discount_percent && offer.discount_percent > 0) {
      discountPercent = offer.discount_percent;
      finalPrice = Math.round(
        category.price_per_night * (1 - discountPercent / 100)
      );
    }
  }

  return { discountPercent, finalPrice };
}

module.exports = { calculateOfferPrice };
