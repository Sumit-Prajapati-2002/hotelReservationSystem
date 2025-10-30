const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie or Authorization header
    let token = req.cookies.token;
    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    // 2️⃣ No token → unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Check admin exists
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: "Forbidden. Admins only." });
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateAdmin };
