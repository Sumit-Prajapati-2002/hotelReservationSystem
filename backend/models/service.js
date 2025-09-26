const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Services = sequelize.define(
  "Services",
  {
    services_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Services;
