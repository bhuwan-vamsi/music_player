const Playlist = require('../models/playlistModel');
const Song = require('../models/songModel');
const User = require('../models/userModel');

// Create playlist
exports.createPlaylist = async (req, res) => {
  const { userEmail, playlistName } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });
    let userPlaylist = await Playlist.findOne({ userId: user._id });
    if (!userPlaylist) {
      userPlaylist = new Playlist({ userId: user._id, playlists: [] });
    }
    userPlaylist.playlists.push({ name: playlistName, songs: [] });
    await userPlaylist.save();
    res.status(200).json({ message: 'Playlist created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist' });
  }
};

// Add song to playlist
exports.addToPlaylist = async (req, res) => {
  const { userEmail, songId, playlistName } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });
    const userPlaylist = await Playlist.findOne({ userId: user._id });
    const playlist = userPlaylist.playlists.find(pl => pl.name === playlistName);
    if (playlist && !playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await userPlaylist.save();
      res.status(200).json({ message: 'Song added to playlist' });
    } else {
      res.status(400).json({ message: 'Song already exists or playlist not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Playlists
exports.getPlaylists = async (req, res) => {
  try {
      const userEmail = req.query.userId;
      const user = await User.findOne({ email: userEmail }).exec();
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const userId = user._id;
      const userPlaylist = await Playlist.findOne({ userId }).exec();

      if (!userPlaylist || userPlaylist.playlists.length === 0) {
          return res.status(200).json({ playlists: [] });
      }

      const playlists = userPlaylist.playlists.map(playlist => {
          return {
              name: playlist.name,
              numberOfSongs: playlist.songs.length,
          };
      });

      return res.status(200).json({ playlists });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};
