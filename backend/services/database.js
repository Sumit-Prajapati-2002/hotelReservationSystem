const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database, // <- database instead of name
  config.development.username, // <- username instead of user
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Neon requires this
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
