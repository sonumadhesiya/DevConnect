const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getProfiles = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Search by skill
    if (reqQuery.skill) {
      query = Profile.find({ skills: { $regex: reqQuery.skill, $options: 'i' } }).populate('user', ['name', 'email']);
    } else {
      query = Profile.find().populate('user', ['name', 'email']);
    }

    const profiles = await query;

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    next(err);
  }
};
exports.getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

    if (!profile) {
      return next(new ErrorResponse('Profile not found for this user', 404));
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return next(new ErrorResponse('Profile not found for this user', 404));
    }
    next(err);
  }
};
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

    if (!profile) {
      return next(new ErrorResponse('There is no profile for this user', 404));
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};
exports.upsertProfile = async (req, res, next) => {
  try {
    const { bio, skills, githubLink } = req.body;
    const profileFields = {
      user: req.user.id,
      bio: bio || '',
      githubLink: githubLink || ''
    };

    if (skills) {
      profileFields.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => skill.trim());
    }
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
    } else {
      profile = await Profile.create(profileFields);
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};
