const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Property_Info = sequelize.define(
  "Property_Info",
  {
    propertyInfo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    opening_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    parkking_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_policy_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Property_Info;
