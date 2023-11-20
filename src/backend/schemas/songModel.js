const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  movie: String,
  lang: String,
  img: String,
  type: String,
  filename: {
    type: String,
    required: true,
  }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
