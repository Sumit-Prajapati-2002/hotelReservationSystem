const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Room_Amenity = require("./RoomAmenity");
const Room_Catagory = require("./RoomCategory");

const Room = sequelize.define(
  "Room",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_catagory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Room_Catagory",
        key: "room_catagory_id",
      },
    },
    room_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    room_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_status: {
      type: DataTypes.ENUM("Not-Available", "Available"),
      defaultValue: "Available",
    },
    room_images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Room;
