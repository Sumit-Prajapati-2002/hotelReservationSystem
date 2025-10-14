const { DataTypes, DatabaseError } = require("sequelize");
const sequelize = require("../services/database");
const Room_Category = require("./room_category");

const Room = sequelize.define(
  "Room",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    room_status: {
      type: DataTypes.ENUM("available", "booked", "maintenance"),
      defaultValue: "available",
    },
    room_capacity:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    room_images:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    room_description:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    room_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room_Category,
        key: "room_category_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Room;
