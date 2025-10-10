const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Room_Category = sequelize.define(
  "Room_Category",
  {
    room_category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price_per_night: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category_images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // store multiple image URLs
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Room_Category;
