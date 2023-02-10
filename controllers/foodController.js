const asyncHandler = require("express-async-handler");
const Food = require("../models/foodModel");

const createFood = asyncHandler(async (req, res) => {

    const { name, calories } = req.body;
    const food = new Food({
        name,
        calories,
    });

    const createdFood = await food.save();

    if(!createdFood){
        res.status(400);
        throw new Error("Food not created");
    }

    res.status(201);
    res.json(createdFood);
});

const getFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find({});
    res.json(foods);
});

const updateFood = asyncHandler(async (req, res) => {
    const foodId = req.params.id;
    const { name, calories } = req.body;

    const food = Food.findById(foodId);

    name !== null ? food.name = name : food.name;
    calories !== null ? food.calories = calories : food.calories;

    const updatedFood = await food.save();

    if(!updatedFood){
        res.status(400);
        throw new Error("Food not updated");
    }

    res.status(200);
    res.json(updatedFood);
});

module.exports = {
    createFood,
    getFoods,
    updateFood,
};