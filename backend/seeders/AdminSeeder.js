'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 10); // default password

    await queryInterface.bulkInsert('Admin', [
      {
        username: 'SuperAdmin',
        email: 'admin@example.com',
        password: hashedPassword,
        phone_no: 9800000000,
      },
      {
        username: 'AdminUser',
        email: 'user@example.com',
        password: await bcrypt.hash('user123', 10),
        phone_no: 9811111111,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admin', null, {});
  },
};
