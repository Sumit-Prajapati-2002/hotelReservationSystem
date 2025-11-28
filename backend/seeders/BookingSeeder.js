'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Booking', [
      {
        checkIn_date: new Date('2025-11-10'),
        checkOut_date: new Date('2025-11-15'),
        status: 'Confirmed',
        total_price: 5000,
        num_guest: 2,
        customer_id: 1, // must exist in Customer table
      },
      {
        checkIn_date: new Date('2025-12-01'),
        checkOut_date: new Date('2025-12-05'),
        status: 'Pending',
        total_price: 3000,
        num_guest: 1,
        customer_id: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Booking', null, {});
  },
};
