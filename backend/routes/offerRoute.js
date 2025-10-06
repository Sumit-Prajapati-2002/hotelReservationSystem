const express = require("express");
const router = express.Router();
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/",authenticateAdmin, createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id",authenticateAdmin, updateOffer);
router.delete("/:id",authenticateAdmin, deleteOffer);

module.exports = router;
