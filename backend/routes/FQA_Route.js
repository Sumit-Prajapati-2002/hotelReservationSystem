const express = require("express");
const router = express.Router();
const {
  createFAQ,
  getAllFAQ,
  getFAQById,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/FAQ_Controllers");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", createFAQ);
router.get("/", getAllFAQ);
router.get("/:id", getFAQById);
router.put("/:id", updateFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;
