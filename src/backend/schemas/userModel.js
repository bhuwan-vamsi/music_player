const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    nickname: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;