const express = require("express");
const router = express.Router();

const {
  createFood,
  getFoods,
  updateFood,
} = require("../controllers/foodController");

const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, getFoods);
router.post("/", protectRoute, createFood);
router.patch("/:id", protectRoute, updateFood);

module.exports = router;
