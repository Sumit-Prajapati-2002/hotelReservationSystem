"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Room_Category", [
      {
        category_name: "Deluxe Room",
        category_description: "Spacious room with king-size bed",
        category_images: ["deluxe1.jpg", "deluxe2.jpg"],
        price_per_night: "5000",
        offer_id: null,
      },
      {
        category_name: "Suite",
        category_description: "Luxury suite with living area",
        category_images: ["suite1.jpg", "suite2.jpg"],
        price_per_night: "10000",
        offer_id: null,
      },
      {
        category_name: "Standard Room",
        category_description: "Comfortable room with essential amenities",
        category_images: ["standard1.jpg", "standard2.jpg"],
        price_per_night: "3000",
        offer_id: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Room_Category", null, {});
  },
};
