const Offer = require("../models/Offer");


async function createOffer(req, res) {
  try {
    const { offer_name, offer_title, offer_description, discount_percent, start_date, end_date, is_active } =
      req.body;

    const offer = await Offer.create({
      offer_name,
      offer_title,
      offer_description,
      discount_percent,
      start_date,
      end_date,
      is_active,
    });

    res.status(201).json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllOffers(req, res) {
  try {
    const offers = await Offer.findAll();
    res.status(200).json({ success: true, offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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


async function updateOffer(req, res) {
  try {
    const { id } = req.params;
    const { offer_name, offer_title, offer_description, discount_percent, start_date, end_date, is_active } =
      req.body;

    const offer = await Offer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    await offer.update({
      offer_name,
      offer_title,
      offer_description,
      discount_percent,
      start_date,
      end_date,
      is_active,
    });

    res.status(200).json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteOffer(req, res) {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    await offer.destroy();
    res.status(200).json({ success: true, message: "Offer deleted successfully" });
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
};
