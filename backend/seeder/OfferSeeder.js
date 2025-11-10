'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Offer', [
      {
        offer_title: 'Winter Special',
        offer_description: '20% off for all rooms in December',
        discount_percent: 20,
        offer_images: 'winter.jpg',
        start_date: new Date('2025-12-01'),
        end_date: new Date('2025-12-31'),
        is_active: true,
      },
      {
        offer_title: 'Summer Deal',
        offer_description: '15% off for early bookings',
        discount_percent: 15,
        offer_images: 'summer.jpg',
        start_date: new Date('2025-06-01'),
        end_date: new Date('2025-06-30'),
        is_active: true,
      },
      {
        offer_title: 'Last Minute Offer',
        offer_description: '10% discount for next 3 days bookings',
        discount_percent: 10,
        offer_images: 'lastminute.jpg',
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 3)),
        is_active: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Offer', null, {});
  },
};
