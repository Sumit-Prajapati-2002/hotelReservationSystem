const express = require("express");
const router = express.Router();
const {
  createContactus,
  getAllContactus,
  getContactusById,
  updateContactus,
  deleteContactus,
} = require("../controllers/contactusController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", createContactus);
router.get("/",authenticateAdmin, getAllContactus);
router.get("/:id", authenticateAdmin,getContactusById);
router.put("/:id", updateContactus);
router.delete("/:id",authenticateAdmin, deleteContactus);

module.exports = router;
