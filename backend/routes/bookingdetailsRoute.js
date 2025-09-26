const express = require("express");
const router = express.Router();
const {
  createBookingDetails,
  getAllBookingDetails,
  getBookingDetailsById,
  updateBookingDetails,
  deleteBookingDetails,
} = require("../controllers/bookingDetailsController");

router.post("/", createBookingDetails);
router.get("/", getAllBookingDetails);
router.get("/:id", getBookingDetailsById);
router.put("/:id", updateBookingDetails);
router.delete("/:id", deleteBookingDetails);

module.exports = router;
