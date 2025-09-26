const Customer = require("../models/customer");

async function createCustomer(req, res) {
  try {
    const { firstname, lastname, email, password, phone_no, guestCheckout } =
      req.body;
    const customer = await Customer.create({
      firstname,
      lastname,
      email,
      password,
      phone_no,
      guestCheckout,
    });
    res.status(201).json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ success: true, customers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password, phone_no, guestCheckout } =
      req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await customer.update({
      firstname,
      lastname,
      email,
      password,
      phone_no,
      guestCheckout,
    });

    res.status(200).json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await customer.destroy();
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
