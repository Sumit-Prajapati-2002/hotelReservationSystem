'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Amenity_Bridge', [
      {
        room_category_id: 1, // replace with actual Room_Category IDs
        room_amenity_id: 1,  // replace with actual Room_Amenity IDs
      },
      {
        room_category_id: 1,
        room_amenity_id: 2,
      },
      {
        room_category_id: 2,
        room_amenity_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Amenity_Bridge', null, {});
  },
};
