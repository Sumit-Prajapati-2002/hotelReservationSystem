const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
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
    const customers = await Customer.findAll({
      attributes: ["firstname", "email", "phone_no"],
    });
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
async function customerLogin(req, res) {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer || customer.password !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        id: customer.customer_id,
        email: customer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, token });
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
  customerLogin,
};
