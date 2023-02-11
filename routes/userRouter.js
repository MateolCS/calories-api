const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const { protectRoute } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", protectRoute, getUserProfile);
router.patch("/:id", protectRoute, updateUserProfile);

module.exports = router;
