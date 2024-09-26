const Song = require('../models/songModel');
const Like = require('../models/likeModel');
const Rating = require('../models/ratingModel');
const { getLyrics, getSong } = require('../helpers/songHelper');

// Like Song
exports.likeSong = async (req, res) => {
  const { like, songId, userId } = req.body;
  try {
      const user = await User.findOne({ email: userId }).exec();
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const userId = user._id;
      const userLike = await Like.findOne({ userId }).exec();

      if (like) {
          if (userLike) {
              if (!userLike.likedSongs.includes(songId)) {
                  userLike.likedSongs.push(songId);
                  await userLike.save();
              }
          } else {
              const newLike = new Like({ userId, likedSongs: [songId] });
              await newLike.save();
          }
      } else {
          if (userLike) {
              userLike.likedSongs.pull(songId);
              await userLike.save();
          }
      }

      res.status(200).end();
  } catch (err) {
      console.error('Error in likeSong:', err);
      res.status(500).json({ message: err.message });
  }
};

// Get Liked Songs
exports.getLikedSongs = async (req, res) => {
  try {
      const userEmail = req.query.userId;
      const user = await User.findOne({ email: userEmail }).exec();
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const userId = user._id;
      const userLike = await Like.findOne({ userId }).exec();

      if (!userLike || userLike.likedSongs.length === 0) {
          return res.status(404).json({ message: 'No liked songs found' });
      }
      const songs = userLike.likedSongs;
      return res.status(200).json({ songs });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get song lyrics
exports.getSongLyrics = async (req, res) => {
  const { songId } = req.body;
  try {
    const song = await Song.findById(songId);
    const songDetails = await getSong(song.name, song.artist);
    res.status(200).json({ songDetails });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving lyrics' });
  }
};

// Rate a song
exports.rateSong = async (req, res) => {
  const { userEmail, songId, rating } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });
    const song = await Song.findById(songId);
    if (!user || !song) {
      return res.status(404).json({ message: 'User or song not found' });
    }
    let userRating = await Rating.findOne({ userId: user._id });
    if (!userRating) {
      userRating = new Rating({ userId: user._id, ratings: [] });
    }
    const existingRating = userRating.ratings.find((r) => r.songId.toString() === songId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      userRating.ratings.push({ songId, rating });
    }
    await userRating.save();
    res.status(200).json({ message: 'Rating saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Song Rating
exports.getSongRating = async (req, res) => {
  const { userEmail, songId } = req.body;
  try {
      const userExists = await User.findOne({ email: userEmail }).exec();
      const userId = userExists._id;

      const userRatings = await Rating.findOne({ userId }).exec();
      if (!userRatings) {
          return res.status(404).json({ error: 'User ratings not found' });
      }

      const songRating = userRatings.ratings.find(r => r.songId === songId);
      if (!songRating) {
          return res.status(404).json({ error: 'Song rating not found' });
      }
      res.status(200).json({ rating: songRating.rating });
  } catch (error) {
      console.error('Error fetching song rating:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};