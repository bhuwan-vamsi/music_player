const getLyrics = require("../backend/genius-lyrics-api-master/lib/getLyrics.js");
const getSong = require('../backend/genius-lyrics-api-master/lib/getSong.js');
// const Song = require('../models/songModel.js');

exports.getSong = getSong;
exports.getLyrics = getLyrics;

// exports.getSongLyrics = async (req, res) => {
//   const { songId } = req.body;
//   try {
//     const song = await Song.findOne({ _id: songId });
//     const artist = song.artist;
//     const name = song.name;

//     const options = {
//       apiKey: process.env.access_token,
//       title: name,
//       artist: artist,
//       optimizeQuery: true
//     };

//     const songDetails = await getSong(options);

//     res.status(200).json({ songDetails });
//   } catch (err) {
//     console.error('Error in /get-song-lyrics route:', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };