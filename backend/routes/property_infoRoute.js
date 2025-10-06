const express = require("express");
const router = express.Router();
const {
  createPropertyInfo,
  getAllPropertyInfo,
  getPropertyInfoById,
  updatePropertyInfo,
  deletePropertyInfo,
} = require("../controllers/property_infoController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", authenticateAdmin,createPropertyInfo);
router.get("/", getAllPropertyInfo);
router.get("/:id", getPropertyInfoById);
router.put("/:id",authenticateAdmin, updatePropertyInfo);
router.delete("/:id",authenticateAdmin, deletePropertyInfo);

module.exports = router;
