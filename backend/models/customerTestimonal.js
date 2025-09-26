const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const CustomerTestimonial = sequelize.define(
  "CustomerTestimonial",
  {
    testimonial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rating:{
        type:DataTypes.FLOAT,
        allowNull:false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = CustomerTestimonial;