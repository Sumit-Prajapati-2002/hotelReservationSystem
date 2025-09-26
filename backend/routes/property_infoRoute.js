const express = require("express");
const router = express.Router();
const {
  createPropertyInfo,
  getAllPropertyInfo,
  getPropertyInfoById,
  updatePropertyInfo,
  deletePropertyInfo,
} = require("../controllers/property_infoController");

router.post("/", createPropertyInfo);
router.get("/", getAllPropertyInfo);
router.get("/:id", getPropertyInfoById);
router.put("/:id", updatePropertyInfo);
router.delete("/:id", deletePropertyInfo);

module.exports = router;
