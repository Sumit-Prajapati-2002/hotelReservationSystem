'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hotel_Amenity', {
      hotel_amenity_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hotel_amenity_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hotel_amenity_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hotel_amenity_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Hotel_Amenity');
  },
};
