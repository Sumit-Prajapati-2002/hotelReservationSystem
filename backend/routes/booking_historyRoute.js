const express = require("express");
const router = express.Router();
const {
  getCustomerBookingHistory,
  getCustomerBookingSummary,
  adminGetBookingHistory,
} = require("../controllers/booking_historyController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.get("/details", getCustomerBookingHistory);
router.get("/", getCustomerBookingSummary);
router.get("/:customer_id", adminGetBookingHistory);
module.exports = router;
