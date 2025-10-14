const { jwtVerify } = require("jose");
async function verifyCustomerJWT(req) {
  try {
    const token = req.cookies?.token;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload; // contains id (customer_id) and email
  } catch (err) {
    return null;
  }
}
