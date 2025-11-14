// routes/roomCategoryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");

const {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  getRoomsByCategory,
  updateRoomCategory,
  deleteRoomCategory,
  getCategoriesWithOffers,
} = require("../controllers/room_categoryController");

const { authenticateAdmin } = require("../middlewares/authenticationAdmin");

router.post(
  "/",
  upload.array("images", 5),
  authenticateAdmin,
  createRoomCategory
);

router.get("/", getAllRoomCategories);

router.get("/offers", getCategoriesWithOffers);

router.get("/:id", getRoomCategoryById);

router.put(
  "/:id",
  upload.array("images", 5),
  authenticateAdmin,
  updateRoomCategory
);

router.delete("/:id", authenticateAdmin, deleteRoomCategory);

router.get("/:categoryId/rooms", getRoomsByCategory);

module.exports = router;
