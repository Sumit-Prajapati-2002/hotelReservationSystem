const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const bcrypt = require("bcrypt");

const Admin = sequelize.define(
  "Admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "firstname is required" },
      },
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
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hashed);
      },
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);


module.exports = Admin;
