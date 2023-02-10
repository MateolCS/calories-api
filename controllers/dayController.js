const asyncHandler = require("express-async-handler");
const Day = require("../models/dayModel");
const Meal = require("../models/mealModel");
const User = require("../models/userModel");
const { getMealFoods } = require("./foodController");

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

  const days = await Promise.all(user.days.map((id) => Day.findById(id)));
  const formattedDays = days.map(({ date, totalCalories }) => {
    return {
      date,
      totalCalories,
    };
  });

  res.status(200);
  res.json(formattedDays);
});

const getDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;
  const day = await Day.findById(dayId);

  if (!day) {
    res.status(404);
    throw new Error("No day found");
  }

  const dayMeals = await Promise.all(
    day.meals.map((meal) => Meal.findById(meal))
  );

  const dayWithMeals = day.meals.map((meal, index) => {});

  res.status(200);
  res.json(dayWithMeals);
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

  await Day.deleteOne({ _id: dayId })
    .then(() => {
      res.status(200);
      res.json({
        message: "Day deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});

module.exports = {
  createDay,
  getDays,
  getDay,
  updateDay,
  deleteDay,
};
