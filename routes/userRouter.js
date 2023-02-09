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
router.get("/profile", protectRoute, getUserProfile);
router.patch("/profile", protectRoute, updateUserProfile);

module.exports = router;
