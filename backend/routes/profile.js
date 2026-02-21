const express = require('express');
const {
  getProfiles,
  getMyProfile,
  upsertProfile,
  getProfileByUserId
} = require('../controllers/profileController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(getProfiles)
  .post(protect, upsertProfile);

router.get('/me', protect, getMyProfile);
router.get('/user/:userId', getProfileByUserId);

module.exports = router;
