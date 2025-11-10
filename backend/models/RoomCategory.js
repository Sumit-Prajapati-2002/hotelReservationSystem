const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
// const room_amenity = require('./roomAmenities');

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
    category_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    price_per_night: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Offer",
        key: "offer_id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Room_Category;
