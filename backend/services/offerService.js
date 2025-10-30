const { Op } = require("sequelize");
const Offer = require("../models/Offer");

/**
 * Create a new offer
 */
async function createOfferService(data) {
  const {
    offer_title,
    offer_description,
    discount_percent,
    offer_image,
    start_date,
    end_date,
    is_active,
  } = data;

  // Validation
  if (!offer_title || !discount_percent || !start_date || !end_date) {
    throw new Error("Missing required fields");
  }

  const newOffer = await Offer.create({
    offer_title,
    offer_description: offer_description || null,
    discount_percent,
    offer_image: offer_image || null,
    start_date,
    end_date,
    is_active: is_active ?? true,
  });

  return newOffer;
}

/**
 * Get all offers (with optional active filter)
 */
async function getAllOffersService(activeOnly) {
  const where = activeOnly === "true" ? { is_active: true } : {};
  const offers = await Offer.findAll({ where });
  return offers;
}

/**
 * Get offer by ID
 */
async function getOfferByIdService(id) {
  const offer = await Offer.findByPk(id);
  if (!offer) {
    throw new Error("Offer not found");
  }
  return offer;
}

/**
 * Update offer by ID
 */
async function updateOfferService(id, data) {
  const offer = await Offer.findByPk(id);
  if (!offer) {
    throw new Error("Offer not found");
  }

  const updatedOffer = await offer.update({
    offer_title: data.offer_title ?? offer.offer_title,
    offer_description: data.offer_description ?? offer.offer_description,
    discount_percent: data.discount_percent ?? offer.discount_percent,
    offer_image: data.offer_image ?? offer.offer_image,
    start_date: data.start_date ?? offer.start_date,
    end_date: data.end_date ?? offer.end_date,
    is_active: data.is_active ?? offer.is_active,
  });

  return updatedOffer;
}

/**
 * Delete offer by ID
 */
async function deleteOfferService(id) {
  const offer = await Offer.findByPk(id);
  if (!offer) {
    throw new Error("Offer not found");
  }

  await offer.destroy();
  return true;
}

/**
 * Deactivate expired offers
 */
async function deactivateExpiredOffersService() {
  const now = new Date();
  const [count] = await Offer.update(
    { is_active: false },
    { where: { end_date: { [Op.lt]: now }, is_active: true } }
  );

  return count;
}

module.exports = {
  createOfferService,
  getAllOffersService,
  getOfferByIdService,
  updateOfferService,
  deleteOfferService,
  deactivateExpiredOffersService,
};
