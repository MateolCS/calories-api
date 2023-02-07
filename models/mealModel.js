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
    default: 0,
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
