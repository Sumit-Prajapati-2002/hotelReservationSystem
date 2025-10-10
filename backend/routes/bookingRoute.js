const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
const {
  authenticateCustomer,
} = require("../middlewares/authenticationCustomer");

router.post("/", createBooking);
router.get("/", authenticateAdmin, getAllBookings);
router.get("/:id", authenticateAdmin, getBookingById);
router.put("/:id", authenticateAdmin, updateBooking);
router.delete("/:id", authenticateAdmin, deleteBooking);

module.exports = router;
