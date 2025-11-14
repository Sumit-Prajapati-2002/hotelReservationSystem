const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // adjust path if needed

const config = require("../config/config");
const {
  createAdminService,
  getAllAdminsService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  getAdminByEmailService,
} = require("../services/adminService");

async function createAdmin(req, res) {
  try {
    const { username, email, password, phone_no } = req.body;
    const admin = await createAdminService({
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
    const admins = await getAllAdminsService();
    res.status(200).json({ success: true, admins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAdminById(req, res) {
  try {
    const { id } = req.params;
    const admin = await getAdminByIdService(id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const admin = await updateAdminService(id, req.body);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteAdmin(req, res) {
  try {
    const { id } = req.params;
    const success = await deleteAdminService(id);
    if (!success) return res.status(404).json({ error: "Admin not found" });
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
    const admin = await getAdminByEmailService(email);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.admin_id, email: admin.email },
      config.app.jwtSecret,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAdminProfile(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin from DB using decoded.id
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Don't send password back
    const { password, ...adminData } = admin.dataValues;

    res.json({ success: true, admin: adminData });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}


module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
  getAdminProfile
};
