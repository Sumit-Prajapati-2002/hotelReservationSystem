const express = require("express");
const router = express.Router();
const {
  createBookingHistory,
  getAllBookingHistories,
  getBookingHistoryById,
  updateBookingHistory,
  deleteBookingHistory,
} = require("../controllers/booking_historyController");
const { authenticateAdmin} = require("../middlewares/authenticationAdmin");
router.post("/", authenticateAdmin, createBookingHistory);
router.get("/", authenticateAdmin, getAllBookingHistories);
router.get("/:id", getBookingHistoryById);
router.put("/:id",  updateBookingHistory);
router.delete("/:id",  deleteBookingHistory);

module.exports = router;
