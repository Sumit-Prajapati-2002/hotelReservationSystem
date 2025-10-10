const Room_Category = require("../models/room_category");


async function createRoomCategory(req, res) {
  try {
    const {
      category_name,
      price_per_night,
      capacity,
      category_description,
      category_images,
    } = req.body;

    if (!category_name || !price_per_night || !capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCategory = await Room_Category.create({
      category_name,
      price_per_night,
      capacity,
      category_description: category_description || null,
      category_images: category_images || null,
    });

    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getAllRoomCategories(req, res) {
  try {
    const categories = await Room_Category.findAll();
    res.status(200).json({ success: true, categories });
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

    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE a room category
async function updateRoomCategory(req, res) {
  try {
    const { id } = req.params;
    const {
      category_name,
      price_per_night,
      capacity,
      category_description,
      category_images,
    } = req.body;

    const category = await Room_Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Room category not found" });
    }

    await category.update({
      category_name: category_name || category.category_name,
      price_per_night: price_per_night || category.price_per_night,
      capacity: capacity || category.capacity,
      category_description:
        category_description || category.category_description,
      category_images: category_images || category.category_images,
    });

    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE a room category
async function deleteRoomCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await Room_Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Room category not found" });
    }

    await category.destroy();
    res
      .status(200)
      .json({ success: true, message: "Room category deleted successfully" });
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
