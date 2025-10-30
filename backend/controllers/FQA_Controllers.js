const {
  createFQAService,
  getAllFQAService,
  getFQAByIdService,
  updateFQAService,
  deleteFQAService,
} = require("../services/FAQService.js");

async function createFQA(req, res) {
  try {
    const fqa = await createFQAService(req.body);
    res.status(201).json({ success: true, fqa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllFQA(req, res) {
  try {
    const fqas = await getAllFQAService();
    res.status(200).json({ success: true, fqas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFQAById(req, res) {
  try {
    const fqa = await getFQAByIdService(req.params.id);
    if (!fqa) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ success: true, fqa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateFQA(req, res) {
  try {
    const fqa = await updateFQAService(req.params.id, req.body);
    if (!fqa) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ success: true, fqa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteFQA(req, res) {
  try {
    const deleted = await deleteFQAService(req.params.id);
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
  createFQA,
  getAllFQA,
  getFQAById,
  updateFQA,
  deleteFQA,
};
