const jwt = require("jsonwebtoken");
const config = require("../config/config");
const CustomerTestimonial = require("../models/customerTestimonal");
const Customer = require("../models/customer");

async function createCustomerTestimonialService(token, data) {
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const decoded = jwt.verify(token, config.app.jwtSecret);
  const customer = await Customer.findByPk(decoded.id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  const fullname = `${customer.firstname} ${customer.lastname}`;

  const testimonial = await CustomerTestimonial.create({
    fullname,
    customer_id: customer.customer_id,
    ...data,
  });

  return testimonial;
}

async function getAllCustomerTestimonialsService() {
  return await CustomerTestimonial.findAll({
    attributes: ["fullname", "comment", "rating"],
  });
}

async function getCustomerTestimonialByIdService(id) {
  return await CustomerTestimonial.findByPk(id);
}

async function updateCustomerTestimonialService(id, data) {
  const testimonial = await CustomerTestimonial.findByPk(id);
  if (!testimonial) return null;

  await testimonial.update(data);
  return testimonial;
}

async function deleteCustomerTestimonialService(id) {
  const testimonial = await CustomerTestimonial.findByPk(id);
  if (!testimonial) return null;

  await testimonial.destroy();
  return true;
}

module.exports = {
  createCustomerTestimonialService,
  getAllCustomerTestimonialsService,
  getCustomerTestimonialByIdService,
  updateCustomerTestimonialService,
  deleteCustomerTestimonialService,
};
