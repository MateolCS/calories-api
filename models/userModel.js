const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {},
    email: {},
    password: {},
    days: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
