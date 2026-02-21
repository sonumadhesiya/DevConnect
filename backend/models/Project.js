const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a project title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  techStack: {
    type: [String],
    required: [true, 'Please add tech stack used in the project']
  },
  githubLink: {
    type: String,
    required: [true, 'Please add a github repository link']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
