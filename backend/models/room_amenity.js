const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Room_Amenity = sequelize.define(
  "Room_Amenity",
  {
    room_amenity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_amenity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_amenity_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Room_Amenity;
