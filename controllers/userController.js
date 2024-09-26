const User = require('../models/userModel');
const Like = require('../models/likeModel');
const Rating = require('../models/ratingModel');
const jwt = require("jsonwebtoken");
const { generateToken } = require('../helpers/jwtHelper');
const { sendResetPasswordEmail } = require('../helpers/emailHelper');

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Sign in user
exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userdata = { name: user.name };
    res.status(200).json({ message: 'OK', userdata });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change Username
exports.changeUsername = async (req, res) => {
  const { email, newUsername } = req.body;
  try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.name = newUsername;
      await user.save();
      res.status(200).json({ success: true, message: 'Username changed successfully' });
  } catch (err) {
      console.error('Error in changeUsername:', err);
      res.status(500).json({ success: false, message: err.message });
  }
};

// Update User Details
exports.updateUserDetails = async (req, res) => {
  const { email, nickname, bio, gender, clearLikes, clearRatings, clearPlaylists, DOB } = req.body;
  try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.nickname = nickname;
      user.bio = bio;
      user.gender = gender;
      user.dob = DOB;
      await user.save();

      if (clearLikes) {
          await Like.findOneAndDelete({ userId: user._id }).exec();
      }
      if (clearRatings) {
          await Rating.findOneAndDelete({ userId: user._id }).exec();
      }
      if (clearPlaylists) {
          await Playlist.findOneAndDelete({ userId: user._id }).exec();
      }

      res.status(200).json({ success: true, message: 'User details updated successfully' });
  } catch (err) {
      console.error('Error in updateUserDetails:', err);
      res.status(500).json({ success: false, message: err.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    const token = generateToken(email);
    sendResetPasswordEmail(email, token);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
