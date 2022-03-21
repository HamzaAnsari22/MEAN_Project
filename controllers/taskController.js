const Task = require("./../models/taskModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createTask = catchAsync(async (req, res, next) => {
  if (!req.body.task_name) next(new AppError("Task Name not found", 404));

  await Task.create(req.body);

  res.status(200).json({
    status: "success",
  });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const doc = await Task.find();

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getSingleTask = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  if (!name) next(new AppError("Name not defined", 404));

  const doc = await Task.findOne({ task_name: name });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) next(new AppError("ID not defined", 404));
  await Task.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id || !name) next(new AppError("ID or name not defined", 404));
  const doc = await Task.findByIdAndUpdate(id, req.body,{new:true});

  res.status(200).json({
    status: "success",
    data: doc,
  });
});
