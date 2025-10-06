const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findByPk(decoded.id);
    if (!admin)
      return res.status(403).json({ message: "Forbidden. Admins only." });
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateAdmin };
