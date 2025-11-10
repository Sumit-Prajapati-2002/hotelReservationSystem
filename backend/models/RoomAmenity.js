const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Room = require('./Room')

const Room_Amenity = sequelize.define(
    'Room_Amenity', 
    {
        room_amenity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_amenity_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_amenity_description: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps:false,
        freezeTableName: true
    }
)

module.exports = Room_Amenity