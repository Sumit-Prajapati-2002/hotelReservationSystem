'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Room', [
      {
        room_category_id: 1, // make sure this exists in Room_Category
        room_no: '101',
        room_description: 'Deluxe room with sea view',
        room_capacity: '2 Adults',
        room_status: 'Available',
        room_image: 'room101.jpg',
      },
      {
        room_category_id: 2,
        room_no: '102',
        room_description: 'Standard room with city view',
        room_capacity: '2 Adults',
        room_status: 'Available',
        room_image: 'room102.jpg',
      },
      {
        room_category_id: 1,
        room_no: '103',
        room_description: 'Suite with balcony',
        room_capacity: '4 Adults',
        room_status: 'Available',
        room_image: 'room103.jpg',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Room', null, {});
  },
};
