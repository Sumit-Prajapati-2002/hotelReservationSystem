const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Customer = require("./customer");
const Booking_Details = require("./Booking_Details");

const Booking = sequelize.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checkIn_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_guest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Manual foreign keys
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Booking;
