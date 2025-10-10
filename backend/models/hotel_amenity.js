const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Hotel_Amenity = sequelize.define(
  "Hotel_Amenity",
  {
    hotel_amenity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    hotel_amenity_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    hotel_amenity_images:{
        type:DataTypes.STRING,
        allowNull:false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Hotel_Amenity;