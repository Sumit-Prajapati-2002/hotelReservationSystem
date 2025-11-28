'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Offer', {
      offer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      offer_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      offer_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount_percent: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      offer_images: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Offer');
  },
};
