const jwt = require("jsonwebtoken");
const CustomerTestimonial = require("../models/customerTestimonal");
const Customer = require("../models/customer");

async function createCustomerTestimonial(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findByPk(decoded.id);
    const fullname = `${customer.firstname} ${customer.lastname}`;
    const { comment, rating } = req.body;

    const customerTestimonial = await CustomerTestimonial.create({
      fullname,
      customer_id: customer.customer_id,
      comment,
      rating,
    });

    res.status(201).json({ success: true, customerTestimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllCustomerTestimonials(req, res) {
  try {
    const testimonials = await CustomerTestimonial.findAll({
      attributes: ["fullname", "comment", "rating"],
    });
    res.status(200).json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerTestimonialById(req, res) {
  try {
    const { id } = req.params;
    const testimonial = await CustomerTestimonial.findByPk(id);

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
    const { id } = req.params;
    const { comment_name, comment, rating } = req.body;

    const testimonial = await CustomerTestimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ error: "Customer Testimonial not found" });
    }

    await testimonial.update({ comment_name, comment, rating });

    res.status(200).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCustomerTestimonial(req, res) {
  try {
    const { id } = req.params;
    const testimonial = await CustomerTestimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ error: "Customer Testimonial not found" });
    }

    await testimonial.destroy();
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
