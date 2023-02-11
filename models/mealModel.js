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
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
      default: [],
    },
  ],
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
