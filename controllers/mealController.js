const asyncHandler = require("express-async-handler");
const Meal = require("../models/mealModel");
const Food = require("../models/foodModel");
const { getMealFoods } = require("../controllers/foodController");

const createMeal = asyncHandler(async (req, res) => {
  const { name, calories, foods } = req.body;
  const meal = new Meal({
    name,
    calories,
    foods,
  });

  const createdMeal = await meal.save();

  if (!createdMeal) {
    res.status(400);
    throw new Error("Meal not created");
  }

  res.status(201);
  res.json(createdMeal);
});

const getMeals = asyncHandler(async (req, res) => {
  const mealsId = req.body.mealsId;

  const meals = await Promise.all(
    mealsId.map((mealId) => Meal.findById(mealId))
  );

  const mealsWithFoods = await Promise.all(
    meals.map((meal) => {
      return getMealFoods(meal.foods);
    })
  );

  const correctMeals = meals.map((meal, index) => {
    return {
      _id: meal._id,
      name: meal.name,
      calories: meal.calories,
      foods: mealsWithFoods[index],
    };
  });

  res.status(200);
  res.json(correctMeals);
});

// test later but most likely doesnt work

const updateMeal = asyncHandler(async (req, res) => {
  const mealId = req.params.id;

  const { name, calories, foods } = req.body;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    res.status(404);
    throw new Error("No meal found");
  }

  name !== null ? (meal.name = name) : meal.name;
  calories !== null ? (meal.calories = calories) : meal.calories;
  foods !== null ? (meal.foods = foods) : meal.foods;

  const updatedMeal = await meal.save();

  if (!updatedMeal) {
    res.status(400);
    throw new Error("Meal not updated");
  }

  res.status(200);
  res.json(updatedMeal);
});

const deleteMeal = asyncHandler(async (req, res) => {
  const mealId = req.params.id;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    res.status(404);
    throw new Error("No meal found");
  }

  const deletedMeal = await meal.remove();

  if (!deletedMeal) {
    res.status(400);
    throw new Error("Meal not deleted");
  }

  res.status(200);
  res.json({ message: "Meal deleted" });
});

module.exports = {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal,
};
