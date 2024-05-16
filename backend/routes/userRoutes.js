const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, profileUrl } = req.body;
    const user = new User({ name, email, profileUrl });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Record a profile view
router.post('/:profileUrl/view', async (req, res) => {
  try {
    const { profileUrl } = req.params;
    const { userId } = req.body;

    const user = await User.findOne({ profileUrl: new RegExp(`^/?${profileUrl}$`, 'i') });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profileViews.push({ user: userId });
    await user.save();

    res.json({ message: 'Profile view recorded' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a user's profile views
router.get('/:profileUrl/views', async (req, res) => {
  try {
    const { profileUrl } = req.params;
    const user = await User.findOne({ profileUrl: `/${profileUrl}` }).populate('profileViews.user', 'name profileUrl');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.profileViews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;