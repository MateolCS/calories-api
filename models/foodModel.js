const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {},
  calories: {},
});

const Food = mongoose.model("Food", foodSchema);
