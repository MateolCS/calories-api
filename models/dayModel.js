const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  date: {},
  meals: [],
  totalCalories: {},
});

const Day = mongoose.model("Day", daySchema);
