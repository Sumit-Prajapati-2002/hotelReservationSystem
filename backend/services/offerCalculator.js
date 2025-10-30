const roomCategoryService = require("../services/roomCategoryService");

/**
 * Controller Layer (Only handles req/res)
 */
async function createRoomCategory(req, res) {
  try {
    const category = await roomCategoryService.createRoomCategory(
      req.body,
      req.files,
      req
    );
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllRoomCategories(req, res) {
  try {
    const categories = await roomCategoryService.getAllRoomCategories();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getRoomCategoryById(req, res) {
  try {
    const category = await roomCategoryService.getRoomCategoryById(
      req.params.id
    );
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateRoomCategory(req, res) {
  try {
    const category = await roomCategoryService.updateRoomCategory(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function deleteRoomCategory(req, res) {
  try {
    await roomCategoryService.deleteRoomCategory(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Room category deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getRoomsByCategory(req, res) {
  try {
    const data = await roomCategoryService.getRoomsByCategory(
      req.params.categoryId
    );
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getCategoriesWithOffers(req, res) {
  try {
    const categories = await roomCategoryService.getCategoriesWithOffers();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
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
