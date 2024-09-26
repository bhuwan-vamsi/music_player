const express = require('express');
const { createPlaylist, addToPlaylist, getPlaylists } = require('../controllers/playlistController');
const router = express.Router();

router.post('/create-playlist', createPlaylist);
router.post('/add-to-playlist', addToPlaylist);
router.get('/playlist', getPlaylists);

module.exports = router;
