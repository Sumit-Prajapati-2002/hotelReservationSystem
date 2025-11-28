'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Room', {
      room_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      room_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Room_Category', // Make sure table exists
          key: 'room_category_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      room_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      room_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      room_capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_status: {
        type: Sequelize.STRING,
        defaultValue: 'Available',
      },
      room_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Room');
  },
};
