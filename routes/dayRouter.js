const express = require("express");
const router = express.Router();
const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay,
} = require("../controllers/dayController");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, getDays);
router.get("/:id", protectRoute, getDay);
router.post("/", protectRoute, createDay);
router.patch("/:id", protectRoute, updateDay);
router.delete("/:id", protectRoute, deleteDay);
module.exports = router;
