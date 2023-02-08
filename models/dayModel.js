const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  meals: {
    type: Array,
    default: [],
  },
  totalCalories: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Day = mongoose.model("Day", daySchema);

export default Day;
