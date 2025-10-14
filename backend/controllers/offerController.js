const Offer = require("../models/Offer");

/**
 * Create a new offer
 */
async function createOffer(req, res) {
  try {
    const {
      offer_title,
      offer_description,
      discount_percent,
      start_date,
      end_date,
      is_active,
      offer_image
    } = req.body;

    // Validation
    if (!offer_title || !discount_percent || !start_date || !end_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOffer = await Offer.create({
      offer_title,
      offer_description: offer_description || null,
      discount_percent,
      offer_image,
      start_date,
      end_date,
      is_active: is_active ?? true,
    });

    res.status(201).json({ success: true, offer: newOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get all offers (optionally only active ones)
 */
async function getAllOffers(req, res) {
  try {
    const { activeOnly } = req.query;

    let where = {};
    if (activeOnly === "true") {
      where = { is_active: true };
    }

    const offers = await Offer.findAll({ where });
    res.status(200).json({ success: true, offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get offer by ID
 */
async function getOfferById(req, res) {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Update an existing offer
 */
async function updateOffer(req, res) {
  try {
    const { id } = req.params;
    const {
      offer_title,
      offer_description,
      discount_percent,
      offer_image,
      start_date,
      end_date,
      is_active,
    } = req.body;

    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    await offer.update({
      offer_title: offer_title ?? offer.offer_title,
      offer_description: offer_description ?? offer.offer_description,
      discount_percent: discount_percent ?? offer.discount_percent,
      offer_image:offer_image??offer.offer_image,
      start_date: start_date ?? offer.start_date,
      end_date: end_date ?? offer.end_date,
      is_active: is_active ?? offer.is_active,
    });

    res.status(200).json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Delete an offer
 */
async function deleteOffer(req, res) {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    await offer.destroy();
    res
      .status(200)
      .json({ success: true, message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Optional: Deactivate expired offers automatically
 */
async function deactivateExpiredOffers(req, res) {
  try {
    const now = new Date();
    const [count] = await Offer.update(
      { is_active: false },
      { where: { end_date: { [require("sequelize").Op.lt]: now } } }
    );

    res.status(200).json({
      success: true,
      message: `${count} offer(s) deactivated.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  deactivateExpiredOffers,
};
