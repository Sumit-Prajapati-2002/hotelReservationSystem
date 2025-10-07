const express = require("express");
const router = express.Router();
const {
  createBookingHistory,
  getAllBookingHistories,
  getBookingHistoryById,
  updateBookingHistory,
  deleteBookingHistory,
} = require("../controllers/booking_historyController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", authenticateAdmin, createBookingHistory);
router.get("/", authenticateAdmin, getAllBookingHistories);
router.get("/:id",authenticateAdmin, getBookingHistoryById);
router.put("/:id", authenticateAdmin, updateBookingHistory);
router.delete("/:id", authenticateAdmin, deleteBookingHistory);

module.exports = router;
