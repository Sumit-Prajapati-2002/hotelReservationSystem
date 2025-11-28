'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Room_Amenity', [
      {
        room_amenity_name: 'WiFi',
        room_amenity_description: 'High-speed wireless internet',
      },
      {
        room_amenity_name: 'Air Conditioning',
        room_amenity_description: 'Individually controlled AC',
      },
      {
        room_amenity_name: 'Mini Bar',
        room_amenity_description: 'Stocked mini bar in the room',
      },
      {
        room_amenity_name: 'TV',
        room_amenity_description: 'Flat-screen television with cable channels',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Room_Amenity', null, {});
  },
};
