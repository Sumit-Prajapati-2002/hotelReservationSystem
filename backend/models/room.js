const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

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
    room_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Room;
