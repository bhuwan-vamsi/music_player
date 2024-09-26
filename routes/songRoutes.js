const express = require('express');
const { likeSong, getLikedSongs, getSongLyrics, rateSong, getSongRating } = require('../controllers/songController');
const router = express.Router();

router.post('/like-song', likeSong);
router.get('/likedsong', getLikedSongs);
router.post('/get-song-lyrics', getSongLyrics);
router.post('/rate-song', rateSong);
router.post('/get-song-rating', getSongRating);

module.exports = router;
