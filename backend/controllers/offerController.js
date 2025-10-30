const {
  createOfferService,
  getAllOffersService,
  getOfferByIdService,
  updateOfferService,
  deleteOfferService,
  deactivateExpiredOffersService,
} = require("../services/offerService");

async function createOffer(req, res) {
  try {
    const offer = await createOfferService(req.body);
    res.status(201).json({ success: true, offer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllOffers(req, res) {
  try {
    const offers = await getAllOffersService(req.query.activeOnly);
    res.status(200).json({ success: true, offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOfferById(req, res) {
  try {
    const offer = await getOfferByIdService(req.params.id);
    res.status(200).json({ success: true, offer });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateOffer(req, res) {
  try {
    const offer = await updateOfferService(req.params.id, req.body);
    res.status(200).json({ success: true, offer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteOffer(req, res) {
  try {
    await deleteOfferService(req.params.id);
    res.status(200).json({ success: true, message: "Offer deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function deactivateExpiredOffers(req, res) {
  try {
    const count = await deactivateExpiredOffersService();
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
