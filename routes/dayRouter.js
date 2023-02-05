const express = require("express");
const router = express.Router();
const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay,
} = require("../controllers/dayController");

router.get("/", getDays);
router.get("/:id", getDay);
router.post("/", createDay);
router.put("/:id", updateDay);
router.delete("/:id", deleteDay);
