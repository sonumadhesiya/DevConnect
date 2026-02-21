const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');
exports.getProjectsByUser = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};
exports.addProject = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    if (req.body.techStack && typeof req.body.techStack === 'string') {
      req.body.techStack = req.body.techStack.split(',').map(tech => tech.trim());
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorResponse(`No project found with the id of ${req.params.id}`, 404));
    }
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this project`, 401));
    }

    if (req.body.techStack && typeof req.body.techStack === 'string') {
      req.body.techStack = req.body.techStack.split(',').map(tech => tech.trim());
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorResponse(`No project found with the id of ${req.params.id}`, 404));
    }
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this project`, 401));
    }

    await Project.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
