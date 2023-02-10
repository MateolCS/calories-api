const asyncHandler = require("express-async-handler");
const Meal = require("../models/mealModel");
const Food = require("../models/foodModel");

const createMeal = asyncHandler(async (req, res) => {
    const { name, calories, foods } = req.body;
    const meal = new Meal({
        name,
        calories,
        foods,
    });

    const createdMeal = await meal.save();


    if(!createdMeal){
        res.status(400);
        throw new Error("Meal not created");
    } 

    res.status(201);
    res.json(createdMeal);
});
const getMeals = asyncHandler(async (req, res) => {
    const {mealsId} = req.body;

    const meals = Promise.all(mealsId.map(async (mealId) => {
        Meal.findById(mealId)
    }))

    const mealsWithFoods = Promise.all(meals.map(async (meal) => {
        meal.foods =  Promise.all(meal.foods.map(async (foodId) => {
            Food.findById(foodId)
        }))
    }));

    if(!mealsWithFoods){
        res.status(404);
        throw new Error("No meals found");
    }

    res.status(200);
    res.json(mealsWithFoods);
});

const updateMeal = asyncHandler(async (req, res) => {
    const mealId = req.params.id;

    const { name, calories, foods } = req.body;

    const meal = await Meal.findById(mealId);

    if(!meal){
        res.status(404);
        throw new Error("No meal found");
    }

    name !== null ? meal.name = name : meal.name;
    calories !== null ? meal.calories = calories : meal.calories;
    foods !== null ? meal.foods = foods : meal.foods;

    const updatedMeal = await meal.save();

    if(!updatedMeal){
        res.status(400);
        throw new Error("Meal not updated");
    }

    res.status(200);
    res.json(updatedMeal);
});

const deleteMeal = asyncHandler(async (req, res) => {
    const mealId = req.params.id;

    const meal = await Meal.findById(mealId);

    if(!meal){
        res.status(404);
        throw new Error("No meal found");
    }

    const deletedMeal = await meal.remove();

    if(!deletedMeal){
        res.status(400);
        throw new Error("Meal not deleted");
    }

    res.status(200);
    res.json({message: "Meal deleted"});
});

module.exports = {
    createMeal,
    getMeals,
    updateMeal,
    deleteMeal,

}