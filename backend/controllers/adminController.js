const Admin = require("../models/admin");

async function createAdmin(req, res) {
  try {
    const { username, email, password, phone_no } = req.body;
    const admin = await Admin.create({
      username,
      email,
      password,
      phone_no,
    });
    res.status(201).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ success: true, admins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAdminById(req, res) {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const { username, email, password, phone_no } = req.body;

    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await admin.update({ username, email, password, phone_no });
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteAdmin(req, res) {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await admin.destroy();
    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
