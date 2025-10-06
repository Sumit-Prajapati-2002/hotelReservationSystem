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
router.post("/", createBookingDetails);
router.get("/", authenticateAdmin, getAllBookingDetails);
router.get("/:id", getBookingDetailsById);
router.put(
  "/:id",
  authenticateAdmin,

  updateBookingDetails
);
router.delete(
  "/:id",
  authenticateAdmin,

  deleteBookingDetails
);

module.exports = router;
