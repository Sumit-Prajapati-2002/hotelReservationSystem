const { searchBookings } = require("../services/adminSearch");

async function adminSearch(req, res) {
  try {
    const {
      checkIn_date,
      checkOut_date,
      firstname,
      lastname,
      phone_no,
      email,
      status,
    } = req.query;

    const results = await searchBookings({
      checkIn_date,
      checkOut_date,
      firstname,
      lastname,
      phone_no,
      email,
      status,
    });
    res.status(200).json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { adminSearch };
