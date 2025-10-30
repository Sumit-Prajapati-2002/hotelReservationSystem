const express = require("express");
const router = express.Router();
const {
  getCustomerBookingHistory,
  getCustomerBookingSummary,
} = require("../controllers/booking_historyController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.get("/details", getCustomerBookingHistory);
router.get("/", getCustomerBookingSummary);

module.exports = router;
