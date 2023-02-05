const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, passwordConfirmation } = req.body;

  const userAlreadyCreated = await User.find({ email: email });

  if (userAlreadyCreated.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  if (!email.includes("@")) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  if (password !== passwordConfirmation) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    caloriesGoal: 0,
  })
    .then(() => {
      res.status(201);
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        caloriesGoal: user.caloriesGoal,
        token: generateToken(user._id),
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});
const loginUser = asyncHandler(async (req, res) => {});
const logoutUser = asyncHandler(async (req, res) => {});
const getUserProfile = asyncHandler(async (req, res) => {});
const updateUserProfile = asyncHandler(async (req, res) => {});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
