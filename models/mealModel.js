const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  foods: {
    type: Array,
    default: [],
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
