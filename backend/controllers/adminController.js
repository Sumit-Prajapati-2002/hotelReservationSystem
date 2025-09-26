const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
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
    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin.admin_id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ success: true, token });
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
  adminLogin,
};
