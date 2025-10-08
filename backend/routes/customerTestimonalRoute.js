const express = require("express");
const router = express.Router();
const {
  createCustomerTestimonial,
  getAllCustomerTestimonials,
  getCustomerTestimonialById,
  updateCustomerTestimonial,
  deleteCustomerTestimonial,
} = require("../controllers/customerTestimonialController");
const { authenticateAdmin } = require("../middlewares/authenticationAdmin");
const { authenticateCustomer } = require("../middlewares/authenticationCustomer");
router.post("/", authenticateCustomer,createCustomerTestimonial);
router.get("/", getAllCustomerTestimonials);
router.get("/:id",authenticateAdmin, getCustomerTestimonialById);
router.put("/:id",authenticateAdmin, updateCustomerTestimonial);
router.delete("/:id",authenticateAdmin, deleteCustomerTestimonial);

module.exports = router;
