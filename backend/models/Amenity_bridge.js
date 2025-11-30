const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Room_Category = require("./room_category");
const Room_Amenity = require("./room_amenity");

const Amenity_Bridge = sequelize.define(
  "Amenity_Bridge",
  {
    amenity_bridge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room_Category,
        key: "room_category_id",
      },
      onDelete: "CASCADE",
    },
    room_amenity_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room_Amenity,
        key: "room_amenity_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Amenity_Bridge;
