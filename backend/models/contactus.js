const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Contactus = sequelize.define(
  "Contact_us",
  {
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    related_subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Contactus;
