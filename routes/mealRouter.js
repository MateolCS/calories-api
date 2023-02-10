const express = require("express");
const router = express.Router();
const {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, getMeals);
router.post("/", protectRoute, createMeal);
router.put("/:id", protectRoute, updateMeal);
router.delete("/:id", protectRoute, deleteMeal);

module.exports = router;
