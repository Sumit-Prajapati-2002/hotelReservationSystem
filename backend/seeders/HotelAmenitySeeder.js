'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Hotel_Amenity', [
      {
        hotel_amenity_name: 'Swimming Pool',
        hotel_amenity_image: 'pool.jpg',
        hotel_amenity_description: 'Outdoor heated swimming pool.',
      },
      {
        hotel_amenity_name: 'Gym',
        hotel_amenity_image: 'gym.jpg',
        hotel_amenity_description: 'Fully equipped modern gym.',
      },
      {
        hotel_amenity_name: 'Spa',
        hotel_amenity_image: 'spa.jpg',
        hotel_amenity_description: 'Relaxing spa treatments available.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Hotel_Amenity', null, {});
  },
};
