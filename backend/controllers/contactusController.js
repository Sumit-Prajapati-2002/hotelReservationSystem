const Contactus = require("../models/contactus");

async function createContactus(req, res) {
  try {
    const { related_subject, message } = req.body;

    const contactus = await Contactus.create({
      related_subject,
      message,
    });

    res.status(201).json({ success: true, contactus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllContactus(req, res) {
  try {
    const messages = await Contactus.findAll();
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getContactusById(req, res) {
  try {
    const { id } = req.params;
    const message = await Contactus.findByPk(id);

    if (!message) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateContactus(req, res) {
  try {
    const { id } = req.params;
    const { related_subject, message } = req.body;

    const contact = await Contactus.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    await contact.update({ related_subject, message });
    res.status(200).json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteContactus(req, res) {
  try {
    const { id } = req.params;
    const contact = await Contactus.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    await contact.destroy();
    res.status(200).json({ success: true, message: "Contact message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createContactus,
  getAllContactus,
  getContactusById,
  updateContactus,
  deleteContactus,
};
