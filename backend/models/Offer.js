// models/Offer.js
const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Offer = sequelize.define(
  "Offer",
  {
    offer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    offer_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_percent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    offer_images:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Offer;
