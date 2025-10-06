const express = require("express");
const router = express.Router();
const { adminSearch } = require("../controllers/adminSearchController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.get("/booking/search", authenticateAdmin, adminSearch);
