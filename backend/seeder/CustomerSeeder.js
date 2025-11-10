'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('mypassword', 10);

    await queryInterface.bulkInsert('Customer', [
      {
        firstname: 'John',
        lastname: 'Doe',
        guestCheckout: false,
        email: 'john@example.com',
        password: hashedPassword1,
        phone_no: 9800000001,
        nationality: 'Nepali',
        citizenship: '123456',
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        guestCheckout: false,
        email: 'jane@example.com',
        password: hashedPassword2,
        phone_no: 9800000002,
        nationality: 'Nepali',
        citizenship: '654321',
      },
      {
        firstname: 'Guest',
        lastname: 'User',
        guestCheckout: true,
        email: 'guest@example.com',
        password: null,
        phone_no: 9800000003,
        nationality: 'Nepali',
        citizenship: '000000',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customer', null, {});
  },
};
