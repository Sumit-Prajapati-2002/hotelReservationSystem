const express = require("express");
const router = express.Router();
const {
  createFQA,
  getAllFQA,
  getFQAById,
  updateFQA,
  deleteFQA,
} = require("../controllers/FQA_Controllers");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", createFQA);
router.get("/", getAllFQA);
router.get("/:id", getFQAById);
router.put("/:id", updateFQA);
router.delete("/:id", deleteFQA);

module.exports = router;
