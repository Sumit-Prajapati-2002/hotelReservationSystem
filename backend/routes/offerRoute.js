const express = require("express");
const router = express.Router();
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");

router.post("/", createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

module.exports = router;
