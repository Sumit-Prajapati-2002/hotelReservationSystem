const {
  createBookingService,
  getBookingByIdService,
  getAllBookingsService,
  updateBookingService,
  deleteBookingService,
} = require("../services/bookingService");

async function createBooking(req, res) {
  try {
    const token = req.cookies.token;
    const result = await createBookingService(req.body, token);
    res.status(201).json({
      success: true,
      booking: result.booking,
      total_price: result.total_price,
      message: result.guestCheckout
        ? "Guest booking created successfully"
        : "Booking created successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Get booking by ID
 */
async function getBookingById(req, res) {
  try {
    const booking = await getBookingByIdService(req.params.id);
    res.status(200).json({ success: true, booking });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getAllBookings(req, res) {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const bookings = await getAllBookingsService(pageNumber, limit);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBooking(req, res) {
  try {
    const booking = await updateBookingService(req.params.id, req.body);
    res.status(200).json({ success: true, booking });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

/**
 * Delete booking controller
 */
async function deleteBooking(req, res) {
  try {
    await deleteBookingService(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
