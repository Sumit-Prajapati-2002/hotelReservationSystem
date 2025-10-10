const FQA = require("../models/FQA");

async function createFQA(req, res) {
  try {
    const { question, answer } = req.body;

    const fqa = await FQA.create({
      question,
      answer,
    });

    res.status(201).json({ success: true, fqa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllFQA(req, res) {
  try {
    const fqas = await FQA.findAll({
      attributes: ["question", "answer"],
    });
    res.status(200).json({ success: true, fqas });
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
}

async function getFQAById(req, res) {
  try {
    const { id } = req.params;
    const fqa = await FQA.findByPk(id);

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
    const { id } = req.params;
    const { question, answer } = req.body;

    const fqa = await FQA.findByPk(id);

    if (!fqa) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    await fqa.update({ question, answer });

    res.status(200).json({ success: true, fqa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteFQA(req, res) {
  try {
    const { id } = req.params;
    const fqa = await FQA.findByPk(id);

    if (!fqa) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    await fqa.destroy();
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
