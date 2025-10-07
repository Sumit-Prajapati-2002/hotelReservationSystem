const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Room_Amenity = require("./room_amenity");

const Room = sequelize.define(
  "Room",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    price_per_night: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: true,
  }
);
module.exports = Room;
