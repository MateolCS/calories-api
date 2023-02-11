const express = require("express");
const router = express.Router();
const {
  createMeal,
  updateMeal,
  deleteMeal,
  getMeal,
} = require("../controllers/mealController");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/:id", protectRoute, getMeal);
router.post("/", protectRoute, createMeal);
router.put("/:id", protectRoute, updateMeal);
router.delete("/:id", protectRoute, deleteMeal);

module.exports = router;
