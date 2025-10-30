const jwt = require("jsonwebtoken");
const {
  findCustomerByEmail,
  createNewCustomer,
  upgradeGuestToRegistered,
  hashPassword,
  findAllCustomers,
  findCustomerById,
  updateCustomerRecord,
  deleteCustomerRecord,
  verifyCustomerCredentials,
} = require("../services/customerService");

async function createCustomer(req, res) {
  try {
    const data = req.body;
    const existingCustomer = await findCustomerByEmail(data.email);

    if (existingCustomer) {
      if (existingCustomer.guestCheckout) {
        const upgraded = await upgradeGuestToRegistered(existingCustomer, data);
        return res.status(200).json({
          success: true,
          message: "Guest upgraded to registered account successfully",
          customer: upgraded,
        });
      }
      return res
        .status(400)
        .json({ error: "Email already registered. Please log in." });
    }

    const hashedPassword =
      !data.guestCheckout && data.password
        ? await hashPassword(data.password)
        : null;

    const newCustomer = await createNewCustomer({
      ...data,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, customer: newCustomer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllCustomers(req, res) {
  try {
    const customers = await findAllCustomers();
    res.status(200).json({ success: true, customers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = await findCustomerById(id);

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
    const customer = await findCustomerById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const updated = await updateCustomerRecord(customer, req.body);
    res.status(200).json({ success: true, customer: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const customer = await findCustomerById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await deleteCustomerRecord(customer);
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
    const customer = await verifyCustomerCredentials(email, password);

    if (!customer) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: customer.customer_id, email: customer.email },
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

async function customerLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
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
  customerLogout,
};
