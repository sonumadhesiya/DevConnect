const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String
  },
  skills: {
    type: [String],
    required: [true, 'Please add at least one skill']
  },
  githubLink: {
    type: String
  },
  profileImage: {
    type: String,
    default: 'no-photo.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
