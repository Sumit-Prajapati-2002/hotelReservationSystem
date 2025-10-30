const { searchBookingsService } = require("../services/adminSearchService");

async function adminSearch(req, res) {
  try {
    const filters = req.query; // contains all query params
    const results = await searchBookingsService(filters);

    res.status(200).json({
      success: true,
      results,
    });
  } catch (err) {
    console.error("Admin search error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { adminSearch };
