const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function createCustomer(req, res) {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone_no,
      guestCheckout,
      nationality,
      citizenship,
    } = req.body;

    const existingCustomer = await Customer.findOne({ where: { email } });

    if (existingCustomer) {
      if (existingCustomer.guestCheckout) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await existingCustomer.update({
          password: hashedPassword,
          guestCheckout: false,
          firstname,
          lastname,
          phone_no,
          nationality,
          citizenship,
        });

        return res.status(200).json({
          success: true,
          message: "Guest upgraded to registered account successfully",
          customer: existingCustomer,
        });
      } else {
        return res
          .status(400)
          .json({ error: "Email already registered. Please log in." });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =
      !guestCheckout && password ? await bcrypt.hash(password, salt) : null;

    const newCustomer = await Customer.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone_no,
      guestCheckout,
      nationality,
      citizenship,
    });

    res.status(201).json({ success: true, customer: newCustomer });
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
    const {
      firstname,
      lastname,
      email,
      password,
      phone_no,
      guestCheckout,
      nationality,
      citizenship,
    } = req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const updated_password = customer.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updated_password = await bcrypt.hash(password, salt);
    }

    await customer.update({
      firstname,
      lastname,
      email,
      password: updated_password,
      phone_no,
      guestCheckout,
      nationality,
      citizenship,
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
    if (!customer || !customer.password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
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
