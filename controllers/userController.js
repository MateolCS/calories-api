const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, passwordConfirmation } = req.body;

  const userAlreadyCreated = await User.find({ email: email });

  if (userAlreadyCreated.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!userName || !email || !password || !passwordConfirmation) {
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
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      caloriesGoal: user.caloriesGoal,
      token: generateToken(user._id),
    });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (!user) {
    res.status(400);
    throw new Error(
      "User is not registered, go to register page and create an account"
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid password. Please try again");
  }

  res.status(200);
  res.json({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    caloriesGoal: user.caloriesGoal,
    token: generateToken(user._id),
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200);
  res.json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { userName, email, caloriesGoal } = req.body;

  if (!userName || !email || !caloriesGoal) {
    res.status(400);
    throw new Error("Not enough data");
  }

  if (caloriesGoal < 0) {
    res.status(400);
    throw new Error("Calories goal must be a positive number");
  }

  if (!email.includes("@")) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  user.userName != userName ? (user.userName = userName) : user.userName;
  user.email != email ? (user.email = email) : user.email;
  user.caloriesGoal != caloriesGoal
    ? (user.caloriesGoal = caloriesGoal)
    : user.caloriesGoal;

  const updatedUser = await user.save();

  const forwardUser = await User.findById(id).select("-password");

  res.status(200);
  res.json(forwardUser);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
