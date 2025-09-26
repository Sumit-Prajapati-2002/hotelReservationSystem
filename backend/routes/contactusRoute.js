const express = require("express");
const router = express.Router();
const {
  createContactus,
  getAllContactus,
  getContactusById,
  updateContactus,
  deleteContactus,
} = require("../controllers/contactusController");

router.post("/", createContactus);
router.get("/", getAllContactus);
router.get("/:id", getContactusById);
router.put("/:id", updateContactus);
router.delete("/:id", deleteContactus);

module.exports = router;
