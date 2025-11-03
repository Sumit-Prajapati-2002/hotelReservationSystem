const {
  createFAQService,
  getAllFAQService,
  getFAQByIdService,
  updateFAQService,
  deleteFAQService,
} = require("../services/FAQService.js");

async function createFAQ(req, res) {
  try {
    const faq = await createFAQService(req.body);
    res.status(201).json({ success: true, faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllFAQ(req, res) {
  try {
    const faqs = await getAllFAQService();
    res.status(200).json({ success: true, faqs: faqs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFAQById(req, res) {
  try {
    const faq = await getFAQByIdService(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ success: true, faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateFAQ(req, res) {
  try {
    const faq = await updateFAQService(req.params.id, req.body);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ success: true, faq: faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteFAQ(req, res) {
  try {
    const deleted = await deleteFAQService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createFAQ,
  getAllFAQ,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
