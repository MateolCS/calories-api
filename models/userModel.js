const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: "Day" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
