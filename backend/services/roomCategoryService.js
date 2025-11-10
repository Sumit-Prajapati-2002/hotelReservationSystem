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
  const category = await Room_Category.findByPk(id);
  if (!category) throw new Error("Room category not found");

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
 * Update a room category
 */
async function updateRoomCategory(id, data) {
  const category = await Room_Category.findByPk(id);
  if (!category) throw new Error("Room category not found");

  await category.update({
    category_name: data.category_name || category.category_name,
    price_per_night: data.price_per_night || category.price_per_night,
    category_description:
      data.category_description || category.category_description,
    category_images: data.category_images || category.category_images,
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

  const offerData = await calculateOfferPrice(categoryId);

  return {
    category: {
      room_category_id: category.room_category_id,
      category_name: category.category_name,
      offer: {
        discountPercent: offerData.discountPercent,
        finalPrice: offerData.finalPricePerNight,
      },
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
