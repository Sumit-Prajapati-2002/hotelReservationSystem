const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Room = require("./room");
const Room_Amenity = sequelize.define(
  "Room_Amenity",
  {
    room_amenity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    room_amenity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_amenity_images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "room_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Room_Amenity;
