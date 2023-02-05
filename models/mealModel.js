const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: {},
  calories: {},
  foods: [],
});

const Meal = mongoose.model("Meal", mealSchema);
