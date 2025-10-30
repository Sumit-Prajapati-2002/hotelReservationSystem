const jwt = require("jsonwebtoken");
const {
  fetchBookingHistory,
  fetchBookingSummary,
} = require("../services/bookingHistoryService");

/**
 * Get full booking history for logged-in customer
 */
async function getCustomerBookingHistory(req, res) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ error: "Unauthorized - no token found" });

    const { id: customer_id } = jwt.verify(token, process.env.JWT_SECRET);
    const history = await fetchBookingHistory(customer_id);

    if (!history.length)
      return res.status(404).json({ message: "No booking history found" });

    res.status(200).json({ success: true, history });
  } catch (err) {
    console.error("Error fetching booking history:", err);
    res.status(500).json({ error: "Failed to fetch booking history" });
  }
}

/**
 * Get booking summary for logged-in customer
 */
async function getCustomerBookingSummary(req, res) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ error: "Unauthorized - no token found" });

    const { id: customer_id } = jwt.verify(token, process.env.JWT_SECRET);
    const summary = await fetchBookingSummary(customer_id);

    if (!summary.length)
      return res.status(404).json({ message: "No booking summary found" });

    res.status(200).json({ success: true, summary });
  } catch (err) {
    console.error("Error fetching booking summary:", err);
    res.status(500).json({ error: "Failed to fetch booking summary" });
  }
}

module.exports = {
  getCustomerBookingHistory,
  getCustomerBookingSummary,
};
