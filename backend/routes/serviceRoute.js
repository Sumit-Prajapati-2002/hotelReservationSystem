const express = require("express");
const router = express.Router();

const {
  createServices,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post("/", authenticateAdmin, createServices);

router.get("/",authenticateAdmin, getServices);

router.get("/:id", getServiceById);

router.put("/:id", authenticateAdmin, updateService);

router.delete("/:id", authenticateAdmin, deleteService);

module.exports = router;
