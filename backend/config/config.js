require("dotenv").config();

const requiredVars = [
  "DB_NAME",
  "DB_USER",
  "DB_PASS",
  "DB_HOST",
  "DB_PORT",
  "DB_DIALECT",
  "JWT_SECRET",
  "EMAIL_PASSWORD",
  "EMAIL_USER",
];

requiredVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Missing environment variable: ${key}`);
});

module.exports = {
  development: {
    username: process.env.DB_USER,      // <- username instead of user
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,      // <- database instead of name
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,      // required for Neon
      },
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
  app: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
};
