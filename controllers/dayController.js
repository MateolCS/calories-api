const asyncHandler = require("express-async-handler");
const Day = require("../models/dayModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createDay = asyncHandler(async (req, res) => {
  const { date, meals, totalCalories } = req.body;

  if (!date || !meals || !totalCalories) {
    res.status(400);
    throw new Error("No day provided");
  }

  const day = new Day({ date, meals, totalCalories });

  const createdDay = await day.save();

  if (!createdDay) {
    res.status(400);
    throw new Error("Day not created");
  }

  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("Incorrect user");
  }

  user.days.push(createdDay._id);
  const savedDay = await user.save();

  if (!savedDay) {
    res.status(400);
    throw new Error("Day not saved");
  }

  res.status(201);
  res.json(createdDay);
});

const getDays = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }

  const days = await Promise.all(
    user.days.map((id) =>
      Day.findById(id).populate({ path: "meals", populate: { path: "foods" } })
    )
  );

  res.status(200);
  res.json(days);
});

const getDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;

  const day = await Day.findById(dayId).populate({
    path: "meals",
    populate: { path: "foods" },
  });

  if (!day) {
    res.status(404);
    throw new Error("No day found");
  }

  res.status(200);
  res.json(day);
});

const updateDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;
  const { day } = req.body;
  const dayToUpdate = await Day.findById(dayId);

  if (!dayToUpdate) {
    res.status(404);
    throw new Error("No day found, incorrect id");
  }

  if (!day) {
    res.status(400);
    throw new Error("No day provided");
  }

  await Day.save({ _id: dayId }, day)
    .then((day) => {
      res.status(200).json(day);
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});

const deleteDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;
  const user = await User.findById(req.user._id);
  const dayMongoId = mongoose.Types.ObjectId(dayId);
  console.log(dayMongoId);

  const day = await Day.findById(dayId);

  if (!day) {
    res.status(404);
    throw new Error("No day found");
  }

  const deletedDay = await day.remove();

  if (!deletedDay) {
    res.status(400);
    throw new Error("Day not deleted");
  }

  user.days = user.days.filter((id) => !id.equals(dayMongoId));
  console.log(user.days);

  const savedUser = await user.save();

  if (!savedUser) {
    res.status(400);
    throw new Error("User not saved");
  }

  res.status(200);
  res.json({ message: "Day deleted" });
});

module.exports = {
  createDay,
  getDays,
  getDay,
  updateDay,
  deleteDay,
};
