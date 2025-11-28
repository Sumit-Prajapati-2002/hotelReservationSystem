'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Booking_Details', [
      {
        booking_id: 1, // replace with actual Booking IDs
        room_id: 1,    // replace with actual Room IDs
      },
      {
        booking_id: 1,
        room_id: 2,
      },
      {
        booking_id: 2,
        room_id: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Booking_Details', null, {});
  },
};
