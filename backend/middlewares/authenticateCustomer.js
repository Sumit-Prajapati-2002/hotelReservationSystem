const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");

const authenticateCustomer = async (req, res, next) => {
  const token = req.cookie.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) {
      return res.status(403).json({ message: "Invalid user" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
module.exports = { authenticateCustomer };
