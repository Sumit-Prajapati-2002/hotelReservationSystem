const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const FAQ = sequelize.define(
  "FAQ",
  {
    FQA_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = FAQ;
