'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contact_us', [
      {
        contact_name: 'John Doe',
        related_subject: 'Booking Issue',
        message: 'I need help with my booking.',
      },
      {
        contact_name: 'Jane Smith',
        related_subject: 'Payment Problem',
        message: 'My payment did not go through.',
      },
      {
        contact_name: 'Alice Brown',
        related_subject: 'General Inquiry',
        message: 'I want to know about your room facilities.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contact_us', null, {});
  },
};
