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
router.post("/", createCustomerTestimonial);
router.get("/",authenticateAdmin, getAllCustomerTestimonials);
router.get("/:id", getCustomerTestimonialById);
router.put("/:id", updateCustomerTestimonial);
router.delete("/:id", deleteCustomerTestimonial);

module.exports = router;
