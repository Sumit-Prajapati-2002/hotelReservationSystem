const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
  getAdminProfile,
} = require("../controllers/adminController");
const { adminSearch } = require("../controllers/adminSearchController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/login", adminLogin);

router.post("/", createAdmin);
router.get("/", authenticateAdmin, getAllAdmins);
router.get("/me", authenticateAdmin, getAdminProfile);
router.get("/booking/search", authenticateAdmin, adminSearch);
router.get("/:id", authenticateAdmin, getAdminById);
router.put("/:id", authenticateAdmin, updateAdmin);
router.delete("/:id", authenticateAdmin, deleteAdmin);

module.exports = router;
