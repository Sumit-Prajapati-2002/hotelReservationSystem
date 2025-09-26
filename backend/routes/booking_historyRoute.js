const express = require("express");
const router = express.Router();
const {
  createBookingHistory,
  getAllBookingHistories,
  getBookingHistoryById,
  updateBookingHistory,
  deleteBookingHistory,
} = require("../controllers/booking_historyController");

router.post("/", createBookingHistory);
router.get("/", getAllBookingHistories);
router.get("/:id", getBookingHistoryById);
router.put("/:id", updateBookingHistory);
router.delete("/:id", deleteBookingHistory);

module.exports = router;
