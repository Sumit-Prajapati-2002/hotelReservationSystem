const express = require("express");
const router = express.Router();
const {
  getCustomerById,
  getCustomerBookingsSummary,
} = require("../controllers/booking_historyController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.get("/details", getCustomerById);
router.get("/", getCustomerBookingsSummary);

module.exports = router;
