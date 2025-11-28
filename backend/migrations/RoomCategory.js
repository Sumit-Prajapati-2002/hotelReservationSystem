"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Room_Category", {
      room_category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      price_per_night: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      offer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Offer",
          key: "offer_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Room_Category");
  },
};
