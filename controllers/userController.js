const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {});
const loginUser = asyncHandler(async (req, res) => {});
const logoutUser = asyncHandler(async (req, res) => {});
const getUserProfile = asyncHandler(async (req, res) => {});
const updateUserProfile = asyncHandler(async (req, res) => {});

const generateToken = (id) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
