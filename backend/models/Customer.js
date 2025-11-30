const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Customer = sequelize.define(
  "Customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "firstname is required" },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "firstname is required" },
      },
    },
    guestCheckout: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "email is required" },
        isEmail: { msg: "email must be valid" },
      },
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Phone number is required" },
        is: {
          args: /^[0-9]{10}$/,
          msg: "phone number must be valid (10 digits)",
        },
      },
    },
    nationality: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    citizenship: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    validate: {
      passwordRequiredIfNotGuest() {
        if (!this.guestCheckout && !this.password) {
          throw new Error("Password is required for registered users");
        }
      },
    },
  }
);

module.exports = Customer;
