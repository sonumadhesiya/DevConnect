const express = require('express');
const {
  getProjectsByUser,
  addProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, addProject);

router.route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.get('/user/:userId', getProjectsByUser);

module.exports = router;
