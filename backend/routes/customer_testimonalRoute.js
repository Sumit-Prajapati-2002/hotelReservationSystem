const express = require("express");
const router = express.Router();
const {
  createCustomerTestimonial,
  getAllCustomerTestimonials,
  getCustomerTestimonialById,
  updateCustomerTestimonial,
  deleteCustomerTestimonial,
} = require("../controllers/customerTestimonialController");

router.post("/", createCustomerTestimonial);
router.get("/", getAllCustomerTestimonials);
router.get("/:id", getCustomerTestimonialById);
router.put("/:id", updateCustomerTestimonial);
router.delete("/:id", deleteCustomerTestimonial);

module.exports = router;
