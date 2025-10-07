const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  createGuestBooking,
} = require("../controllers/bookingController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
const {
  authenticateCustomer,
} = require("../middlewares/authenticationCustomer");
router.post("/guest", createGuestBooking);
router.post("/",  createBooking);
router.get("/",  getAllBookings);
router.get("/:id", authenticateAdmin, getBookingById);
router.put("/:id", authenticateAdmin, updateBooking);
router.delete("/:id", authenticateAdmin, deleteBooking);

module.exports = router;
