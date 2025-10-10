const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Customer = require("./customer");
const Booking = require("./Booking");
const Booking_History = sequelize.define(
  "Booking_history",
  {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    booking_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Booking,
        key: "booking_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Booking_History;
