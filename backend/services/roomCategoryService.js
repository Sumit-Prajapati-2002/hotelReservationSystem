const Room_Category = require("../models/RoomCategory");
const { calculateOfferPrice } = require("../services/offerCalculator");
const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

/**
 * Create new room category
 */
async function createRoomCategory(data, files, req) {
  const { category_name, price_per_night, category_description, offer_id } =
    data;

  if (!category_name || !price_per_night) {
    throw new Error("Missing required fields");
  }

  // Handle uploaded images
  let imageUrls = [];
  if (files && files.length > 0) {
    imageUrls = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
  } else {
    throw new Error("At least one image must be uploaded");
  }

  // Save to DB
  const newCategory = await Room_Category.create({
    category_name,
    price_per_night,
    category_description: category_description || null,
    category_images: imageUrls.length > 0 ? imageUrls : null,
    offer_id: offer_id || null,
  });

  return { ...newCategory.toJSON(), category_images: imageUrls };
}

/**
 * Get all room categories with offers
 */
async function getAllRoomCategories() {
  const categories = await Room_Category.findAll();

  if (!categories || categories.length === 0) {
    throw new Error("No room categories found");
  }

  const categoriesWithOffers = await Promise.all(
    categories.map(async (category) => {
      const offerData = await calculateOfferPrice(category.room_category_id);
      return {
        ...category.toJSON(),
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      };
    })
  );

  return categoriesWithOffers;
}

/**
 * Get single room category by ID with offer
 */
async function getRoomCategoryById(id) {
  // Fetch category with joined amenities
  const result = await sequelize.query(
    `
    SELECT 
      rc."room_category_id",
      rc."category_name",
      rc."category_description",
      rc."price_per_night",
      rc."category_images",
      ra."room_amenity_id",
      ra."room_amenity_name",
      ra."room_amenity_description"
    FROM "Room_Category" AS rc
    LEFT JOIN "Amenity_Bridge" AS ab
      ON rc."room_category_id" = ab."room_category_id"
    LEFT JOIN "Room_Amenity" AS ra
      ON ab."room_amenity_id" = ra."room_amenity_id"
    WHERE rc."room_category_id" = :id;
    `,
    { replacements: { id }, type: QueryTypes.SELECT }
  );

  if (!result || result.length === 0)
    throw new Error("Room category not found");

  // Extract category info from first row
  const categoryInfo = {
    room_category_id: result[0].room_category_id,
    category_name: result[0].category_name,
    category_description: result[0].category_description,
    price_per_night: result[0].price_per_night,
    category_images: result[0].category_images || [],
  };

  // Extract amenities
  const amenities = result
    .filter((row) => row.room_amenity_id)
    .map((row) => ({
      room_amenity_id: row.room_amenity_id,
      room_amenity_name: row.room_amenity_name,
      room_amenity_description: row.room_amenity_description,
    }));

  // Add offer info
  const offerData = await calculateOfferPrice(categoryInfo.room_category_id);

  return {
    ...categoryInfo,
    offer: {
      discountPercent: offerData.discountPercent,
      finalPrice: offerData.finalPrice,
    },
    amenities,
  };
}

/**
 * Update a room category
 */
async function updateRoomCategory(id, data, files, req) {
  const category = await Room_Category.findByPk(id);
  if (!category) throw new Error("Room category not found");

  // Handle uploaded images
  let imageUrls = category.category_images || [];
  if (files && files.length > 0) {
    // map uploaded files to URLs
    imageUrls = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
  }

  await category.update({
    category_name: data.category_name || category.category_name,
    price_per_night: data.price_per_night || category.price_per_night,
    category_description:
      data.category_description || category.category_description,
    category_images: imageUrls, // ✅ replace old images if new ones uploaded
    offer_id: data.offer_id || category.offer_id,
  });

  const offerData = await calculateOfferPrice(category.room_category_id);

  return {
    ...category.toJSON(),
    offer: {
      discountPercent: offerData.discountPercent,
      finalPrice: offerData.finalPrice,
    },
  };
}

/**
 * Delete a room category
 */
async function deleteRoomCategory(id) {
  const category = await Room_Category.findByPk(id);
  if (!category) throw new Error("Room category not found");

  await category.destroy();
  return true;
}

/**
 * Get all rooms under a specific category
 */
async function getRoomsByCategory(categoryId) {
  const category = await Room_Category.findByPk(categoryId);
  if (!category) throw new Error("Room category not found");

  const rooms = await sequelize.query(
    `
      SELECT 
        r."room_id",
        r."room_no",
        r."room_status",
        r."room_description",
        r."room_image",
        r."room_capacity"
      FROM "Room" r
      WHERE r."room_category_id" = :categoryId
      ORDER BY r."room_id" ASC
    `,
    {
      replacements: { categoryId },
      type: QueryTypes.SELECT,
    }
  );

  // Count the number of rooms
  const totalRooms = rooms.length;

  const offerData = await calculateOfferPrice(categoryId);

  return {
    category: {
      room_category_id: category.room_category_id,
      category_name: category.category_name,
      offer: {
        discountPercent: offerData.discountPercent,
        finalPrice: offerData.finalPricePerNight,
      },
      totalRooms, // added total rooms here
    },
    rooms,
  };
}

/**
 * Get only categories that have active offers
 */
async function getCategoriesWithOffers() {
  const categories = await Room_Category.findAll();
  if (!categories || categories.length === 0) {
    throw new Error("No room categories found");
  }

  const categoriesWithOffers = [];
  for (const category of categories) {
    const offerData = await calculateOfferPrice(category.room_category_id);
    if (offerData.discountPercent && offerData.discountPercent > 0) {
      categoriesWithOffers.push({
        ...category.toJSON(),
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      });
    }
  }

  if (categoriesWithOffers.length === 0) {
    throw new Error("No room categories with active offers found");
  }

  return categoriesWithOffers;
}

module.exports = {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
  getRoomsByCategory,
  getCategoriesWithOffers,
};
