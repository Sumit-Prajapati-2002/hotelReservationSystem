const express = require("express");
const router = express.Router();
const {
  createBookingDetails,
  getAllBookingDetails,
  getBookingDetailsById,
  updateBookingDetails,
  deleteBookingDetails,
} = require("../controllers/bookingDetailsController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
const {
  authenticateCustomer,
} = require("../middlewares/authenticationCustomer");
router.post("/", authenticateCustomer, createBookingDetails);
router.get("/", authenticateAdmin, getAllBookingDetails);
router.get("/:id", authenticateAdmin, getBookingDetailsById);
router.put("/:id", authenticateAdmin, updateBookingDetails);
router.delete(
  "/:id",
  authenticateAdmin,

  deleteBookingDetails
);

module.exports = router;
