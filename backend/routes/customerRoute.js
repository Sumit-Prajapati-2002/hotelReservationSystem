const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  customerLogin,
} = require("../controllers/customerController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", createCustomer);
router.get("/", authenticateAdmin, getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/login", customerLogin);

module.exports = router;
