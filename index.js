const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
const app = express();
const { ErrorHandler } = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ErrorHandler);

app.use("/api/users", require("./routes/userRouter"));
app.use("/api/days", require("./routes/dayRouter"));
app.use("/api/meals", require("./routes/mealRouter"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
