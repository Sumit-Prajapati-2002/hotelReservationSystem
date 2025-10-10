const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  customerLogin,
  customerLogout,
} = require("../controllers/customerController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
router.post("/", createCustomer);
router.get("/", authenticateAdmin, getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/login", customerLogin);
router.post("/logout", customerLogout);

module.exports = router;
