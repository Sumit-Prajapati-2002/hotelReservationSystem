const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Customer = require("./Customer");
const CustomerTestimonial = sequelize.define(
  "CustomerTestimonial",
  {
    testimonial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
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
    timestamps: false,
  }
);
module.exports = CustomerTestimonial; 