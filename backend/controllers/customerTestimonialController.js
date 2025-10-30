const {
  createCustomerTestimonialService,
  getAllCustomerTestimonialsService,
  getCustomerTestimonialByIdService,
  updateCustomerTestimonialService,
  deleteCustomerTestimonialService,
} = require("../services/customerTestimonialService");

async function createCustomerTestimonial(req, res) {
  try {
    const token = req.cookies.token;
    const customerTestimonial = await createCustomerTestimonialService(
      token,
      req.body
    );
    res.status(201).json({ success: true, customerTestimonial });
  } catch (err) {
    if (
      err.message.includes("Unauthorized") ||
      err.message.includes("Customer not found")
    ) {
      return res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
}

async function getAllCustomerTestimonials(req, res) {
  try {
    const testimonials = await getAllCustomerTestimonialsService();
    res.status(200).json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerTestimonialById(req, res) {
  try {
    const testimonial = await getCustomerTestimonialByIdService(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Customer Testimonial not found" });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCustomerTestimonial(req, res) {
  try {
    const testimonial = await updateCustomerTestimonialService(
      req.params.id,
      req.body
    );
    if (!testimonial) {
      return res.status(404).json({ error: "Customer Testimonial not found" });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCustomerTestimonial(req, res) {
  try {
    const deleted = await deleteCustomerTestimonialService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Customer Testimonial not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Customer Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createCustomerTestimonial,
  getAllCustomerTestimonials,
  getCustomerTestimonialById,
  updateCustomerTestimonial,
  deleteCustomerTestimonial,
};
