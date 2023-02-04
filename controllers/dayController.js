const asyncHandler = require("express-async-handler");

const addDay = asyncHandler(async (req, res) => {});
const getDays = asyncHandler(async (req, res) => {});
const getDayById = asyncHandler(async (req, res) => {});
const updateDay = asyncHandler(async (req, res) => {});
const deleteDay = asyncHandler(async (req, res) => {});

module.exports = {
  addDay,
  getDays,
  getDayById,
  updateDay,
  deleteDay,
};
