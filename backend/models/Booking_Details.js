const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Booking_Details = sequelize.define(
  "Booking_Details",
  {
    booking_details_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Booking",
        key: "booking_id",
      },
      onDelete: "CASCADE",
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Room",
        key: "room_id",
      },
      onDelete: "CASCADE",
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Promos_and_Offers",
        key: "offer_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Booking_Details;
