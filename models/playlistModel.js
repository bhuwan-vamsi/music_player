const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  playlists: [
    {
      name: {
        type: String,
        required: true,
      },
      songs: [
        {
          type: String,
        },
      ],
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
