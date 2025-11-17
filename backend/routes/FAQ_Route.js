const express = require("express");
const router = express.Router();
const {
  createFAQ,
  getAllFAQ,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  getFive,
} = require("../controllers/FAQ_Controllers");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", authenticateAdmin, createFAQ);
router.get("/", authenticateAdmin, getAllFAQ);
router.get("/five", getFive);
router.get("/:id", authenticateAdmin, getFAQById);
router.put("/:id", authenticateAdmin, updateFAQ);
router.delete("/:id", authenticateAdmin, deleteFAQ);

module.exports = router;
