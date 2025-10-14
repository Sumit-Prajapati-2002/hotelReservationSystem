
const Room_Category = require("../models/room_category");
const { calculateOfferPrice } = require("../services/offerCalculator");

async function createRoomCategory(req, res) {
  try {
    const {
      category_name,
      price_per_night,
      category_description,
      category_images,
      offer_id, // allow linking offer directly on creation
    } = req.body;

    if (!category_name || !price_per_night) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCategory = await Room_Category.create({
      category_name,
      price_per_night,
      category_description: category_description || null,
      category_images: category_images || null,
      offer_id: offer_id || null, // optional
    });

    // Calculate and attach offer price if applicable
    const offerData = await calculateOfferPrice(newCategory.room_category_id);

    res.status(201).json({
      success: true,
      category: {
        ...newCategory.toJSON(),
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllRoomCategories(req, res) {
  try {
    const categories = await Room_Category.findAll();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: "No room categories found" });
    }

    // Add offer calculation for each category
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

    res.status(200).json({ success: true, categories: categoriesWithOffers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRoomCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Room_Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Room category not found" });
    }

    const offerData = await calculateOfferPrice(category.room_category_id);

    res.status(200).json({
      success: true,
      category: {
        ...category.toJSON(),
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRoomCategory(req, res) {
  try {
    const { id } = req.params;
    const {
      category_name,
      price_per_night,
      category_description,
      category_images,
      offer_id,
    } = req.body;

    const category = await Room_Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Room category not found" });
    }

    await category.update({
      category_name: category_name || category.category_name,
      price_per_night: price_per_night || category.price_per_night,
      category_description:
        category_description || category.category_description,
      category_images: category_images || category.category_images,
      offer_id: offer_id || category.offer_id,
    });

    // Recalculate offer after update
    const offerData = await calculateOfferPrice(category.room_category_id);

    res.status(200).json({
      success: true,
      category: {
        ...category.toJSON(),
        offer: {
          discountPercent: offerData.discountPercent,
          finalPrice: offerData.finalPrice,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteRoomCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Room_Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Room category not found" });
    }

    await category.destroy();
    res.status(200).json({
      success: true,
      message: "Room category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
};
