require("dotenv").config();
module.exports = {
  app: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
  },
  db:{
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dailect:process.env.DB_DIALECT,
  }
};
