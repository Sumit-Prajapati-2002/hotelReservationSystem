'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FAQ', [
      {
        question: 'What is the check-in time?',
        answer: 'Check-in starts at 2 PM.',
      },
      {
        question: 'Do you provide free Wi-Fi?',
        answer: 'Yes, free Wi-Fi is available for all guests.',
      },
      {
        question: 'Is breakfast included?',
        answer: 'Yes, breakfast is included with all room bookings.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FAQ', null, {});
  },
};
