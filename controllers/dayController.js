const asyncHandler = require("express-async-handler");
const Day = require("../models/dayModel");

const addDay = asyncHandler(async (req, res) => {
  const { day } = req.body;

  if (!day) {
    res.status(400);
    throw new Error("No day provided");
  }

  await Day.create(day)
    .then((day) => {
      res.status(201).json({
        day,
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});
const getDays = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const days = await Day.find({ user: userId });

  if (!days) {
    res.status(404);
    throw new Error("No days found");
  }

  res.status(200);
  res.json(days);
});
const getDayById = asyncHandler(async (req, res) => {
  const dayId = req.params.id;
  const day = await Day.findById(dayId);

  if (!day) {
    res.status(404);
    throw new Error("No day found");
  }
});
const updateDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;
  const { day } = req.body;
  const dayToUpdate = await Day.findById(dayId);

  if (!dayToUpdate) {
    res.status(404);
    throw new Error("No day found, incorrect id");
  }

  if (!day) {
    res.status(400);
    throw new Error("No day provided");
  }

  await Day.update({ _id: dayId }, day)
    .then((day) => {
      res.status(200).json({
        day,
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});
const deleteDay = asyncHandler(async (req, res) => {
  const dayId = req.params.id;

  await Day.deleteOne({ _id: dayId })
    .then(() => {
      res.status(200);
      res.json({
        message: "Day deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});

module.exports = {
  addDay,
  getDays,
  getDayById,
  updateDay,
  deleteDay,
};
