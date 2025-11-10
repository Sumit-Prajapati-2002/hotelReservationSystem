'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CustomerTestimonial', [
      {
        fullname: 'John Doe',
        comment: 'Amazing stay, very comfortable!',
        rating: 4.5,
        customer_id: 1, // must exist in Customer table
      },
      {
        fullname: 'Jane Smith',
        comment: 'Great service and friendly staff.',
        rating: 5.0,
        customer_id: 2,
      },
      {
        fullname: 'Guest User',
        comment: 'Good experience as a guest.',
        rating: 4.0,
        customer_id: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CustomerTestimonial', null, {});
  },
};
