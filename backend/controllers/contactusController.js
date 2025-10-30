const {
  createContactusService,
  getAllContactusService,
  getContactusByIdService,
  updateContactusService,
  deleteContactusService,
} = require("../services/contactUsService");

async function createContactus(req, res) {
  try {
    const contactus = await createContactusService(req.body);
    res.status(201).json({ success: true, contactus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllContactus(req, res) {
  try {
    const messages = await getAllContactusService();
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getContactusById(req, res) {
  try {
    const message = await getContactusByIdService(req.params.id);

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
    const contact = await updateContactusService(req.params.id, req.body);

    if (!contact) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    res.status(200).json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteContactus(req, res) {
  try {
    const deleted = await deleteContactusService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Contact message not found" });
    }

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
