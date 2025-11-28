'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Amenity_Bridge', {
      amenity_bridge_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      room_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Room_Category', // Table name of Room_Category
          key: 'room_category_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      room_amenity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Room_Amenity', // Table name of Room_Amenity
          key: 'room_amenity_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Amenity_Bridge');
  },
};
