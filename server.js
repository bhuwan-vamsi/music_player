// Requiring all dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();
const getLyrics = require("../spotify/src/backend/lyricsapi/genius-lyrics-api-master/genius-lyrics-api-master/lib/getLyrics.js");
const getSong = require("../spotify/src/backend/lyricsapi/genius-lyrics-api-master/genius-lyrics-api-master/lib/getSong.js");

//const { music } = require('./src/music.js');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/musicdetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Importing Schemas
const User = require('./src/backend/schemas/userModel');
const Like = require('./src/backend/schemas/likeModel');
const Rating = require('./src/backend/schemas/ratingModel');
const Song = require('./src/backend/schemas/songModel.js');
const Playlist = require('./src/backend/schemas/playlistModel.js');

// Middleware functions
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Save music details to the database
// async function saveSongToDatabase(song) {
//   try {
//     const songId = song.id.toString();
//     // Check if the song already exists in the database based on the id
//     const existingSong = await Song.findById(songId).exec();
//     if (existingSong) {
//       // If the song already exists, update all details
//       await Song.findByIdAndUpdate(songId, song);
//       console.log(`Song "${song.name}" updated in the database`);
//     } else {
//       // If the song does not exist, add it to the database
//       await Song.create(song);
//       console.log(`Song "${song.name}" added to the database`);
//     }
//   } catch (error) {
//     console.error(`Error saving song "${song.name}" to the database:`, error);
//   }
// }

// music.forEach(saveSongToDatabase);

// API functions
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const newUser = new User({ name, email, password });
  newUser.save().then(() => {
      res.status(200).json({ message: 'Success' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.password !== password) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    const userdata = {
      name : user.name,
    }

    res.status(200).json({ message: 'OK', userdata: userdata });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (user.password !== oldPassword) {
          return res.status(401).json({ success: false, message: 'Incorrect old password' });
      }
      user.password = newPassword;
      await user.save();

      res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
      console.error('Error in /change-password route:', err);
      res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/change-username', async (req, res) => {
  const { email, newUsername } = req.body;

  try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.name = newUsername;
      await user.save();

      res.status(200).json({ success: true, message: 'Username changed successfully' });
  } catch (err) {
      console.error('Error in /change-username route:', err);
      res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/update-user-details', upload.none(), async (req, res) => {
  const { email, nickname, bio, gender, clearLikes, clearRatings, clearPlaylists, DOB } = req.body;

  try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      // Update the user's bio and gender
      user.nickname = nickname;
      user.bio = bio;
      user.gender = gender;
      user.dob = DOB;
      await user.save();

      // Handle clearing userLikes
      if (clearLikes) {
          await Like.findOneAndDelete({ userId: user._id }).exec();
      }

      // Handle clearing userRatings
      if (clearRatings) {
          await Rating.findOneAndDelete({ userId: user._id }).exec();
      }

      // Handle clearing userPlaylists
      if (clearPlaylists) {
          await Playlist.findOneAndDelete({ userId: user._id }).exec();
      }

      res.status(200).json({ success: true, message: 'User details updated successfully' });
  } catch (err) {
      console.error('Error in /update-user-details route:', err);
      res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/like-song', async (req, res) => {
  const like = req.body.like;
  const songId = req.body.songId;
  const email = req.body.userId;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;
    // Find the user's like document
    const userLike = await Like.findOne({ userId }).exec();
    if (like) {
      // If like is true, add the songId to the likedSongs array
      if (userLike) {
        if (!userLike.likedSongs.includes(songId)) {
          userLike.likedSongs.push(songId);
          await userLike.save();
        }
      } else {
        // If the user does not have a like document, create a new one
        const newLike = new Like({ userId, email, likedSongs: [songId] });
        await newLike.save();
      }
    } else {
      // If like is false, remove the songId from the likedSongs array
      if (userLike) {
        userLike.likedSongs.pull(songId);
        await userLike.save();
      }
    }

    res.status(200).end();
  } catch (err) {
    console.error('Error in /like-song route:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/likedsong', async (req, res) => {
  try {
    const userEmail = req.query.userId;
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;
    const userLike = await Like.findOne({ userId }).exec();

    if (!userLike || userLike.length === 0) {
      return res.status(404);
    }
    // Assuming your Like model has a field named 'likedSongs'
    const songs = userLike.likedSongs;
    return res.status(200).json({ songs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/playlist', async (req, res) => {
  try {
    const userEmail = req.query.userId;
    const user = await User.findOne({ email: userEmail }).exec();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id;
    const userPlaylist = await Playlist.findOne({ userId }).exec();

    if (!userPlaylist || userPlaylist.playlists.length === 0) {
      console.log('Playlist not found');
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
});

app.post('/create-playlist', async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const playlistName = req.body.playlistName;
    // Find the user based on the email
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the user already has a playlist document
    let userPlaylist = await Playlist.findOne({ userId: user._id }).exec();
    if (!userPlaylist) {
      // If the user doesn't have a playlist document, create a new one
      userPlaylist = new Playlist({ userId: user._id, playlists: [] });
    }
    // Add the new playlist to the playlists array
    userPlaylist.playlists.push({ name: playlistName, songs: [] });
    // Save the updated playlist document
    await userPlaylist.save();
    res.status(200).json({ message: 'Playlist created successfully' });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/add-to-playlist', async (req, res) => {
  const { userEmail, songId, playlistName } = req.body;
  try {
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;

    // Find the user's playlist document
    const userPlaylist = await Playlist.findOne({ userId }).exec();

    if (!userPlaylist) {
      return res.status(404).json({ message: 'User playlist not found' });
    }

    // Find the selected playlist
    const selectedPlaylist = userPlaylist.playlists.find(
      (pl) => pl.name === playlistName
    );

    if (!selectedPlaylist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the song already exists in the playlist
    if (!selectedPlaylist.songs.includes(songId)) {
      selectedPlaylist.songs.push(songId);
      await userPlaylist.save();
      res.status(200).json({ message: 'Song added to playlist successfully' });
    } else {
      res.status(200).json({ message: 'Song already exists in the playlist' });
    }
  } catch (error) {
    console.error('Error in /add-to-playlist route:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/rate-song', async (req, res) => {
  const { userEmail, songId, rating } = req.body;

  try {
    // Check if the user and song exist
    const userExists = await User.findOne({ email : userEmail }).exec();
    const songExists = await Song.findOne({ _id : songId }).exec();
    if (!userExists || !songExists) {
      return res.status(404).json({ message: 'User or song not found' });
    }
  
    const userId = userExists._id;

    // Find the user's ratings document or create a new one
    let userRatings = await Rating.findOne({ userId : userId }).exec();

    if (!userRatings) {
      userRatings = new Rating({ userId , ratings: [] });
    }

    // Check if the user has already rated the song
    const existingRatingIndex = userRatings.ratings.findIndex(
      (r) => r.songId.toString() === songId
    );

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      userRatings.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating
      userRatings.ratings.push({ songId, rating });
    }

    await userRatings.save();

    res.status(200).json({ message: 'Rating saved successfully' });
  } catch (err) {
    console.error('Error in /rate-song route:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/get-song-rating', async (req, res) => {
  const { userEmail, songId } = req.body;

  try {
    const userExists = await User.findOne({ email : userEmail }).exec();

    userId = userExists._id;

    // Find the user's ratings document
    const userRatings = await Rating.findOne({ userId }).exec();

    if (!userRatings) {
      return res.status(404).json({ error: 'User ratings not found' });
    }

    // Find the rating for the requested song
    const songRating = userRatings.ratings.find(r => r.songId === songId);

    if (!songRating) {
      return res.status(404).json({ error: 'Song rating not found' });
    }
    res.status(200).json({ rating: songRating.rating });
  } catch (error) {
    console.error('Error fetching song rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/get-song-lyrics', async (req, res) => {
  const { songId } = req.body;
  try {
    const song = await Song.findOne({_id: songId});
    const artist = song.artist;
    const name = song.name;

    const options = {
      apiKey : process.env.access_token,
      title : name,
      artist : artist,
      optimizeQuery : true
    }

    const [songDetails] = await Promise.all([getSong(options)]);

    res.status(200).json({ songDetails });

  } catch (err) {
    console.error('Error in /get-song-lyrics route:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/forgotpassword',async(req,res)=>{
   const email=req.body.email;
   const user = await User.findOne({ email: email })
   if(!user){
   return  res.status(404).send({message:"user fucked up"});
   }
   const token =jwt.sign({email},"jwt-security-key",{expiresIn:"1h"})
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhunvcs@gmail.com',
      pass: 'jyfrywqftcejhqqv'
    }
  });
  
  var mailOptions = {
    from: 'bhunvcs@gmail.com',
    to: `${email}`,
    subject: 'RESET PASSWORD ',
    text: `http://localhost:3000/reset-password/${token}`
  };
  // console.log(`http://localhost:3000/reset-password/${token}`)
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).send({message:"email sent successfully"})
})


app.post('/reset-password/:token',async(req,res)=>{
  const {token}=req.params;
  const {password} = req.body;
  try{
    const decoded=jwt.verify(token,'jwt-security-key');
    const user=await User.findOne({email:decoded.email});
    if(!user){
      res.status(404).send({message:"user not found"});
    }
    user.password=password;
    await user.save();
    res.status(200).send({message:"Password Reset Success"});
  }catch(e){
    res.status(400).send({message:"Invalid or expired token"});
  }
})

/// sending all user details to the localStorage

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});