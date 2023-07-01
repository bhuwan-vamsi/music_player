const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/musicdetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  newUser
    .save()
    .then(() => {
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
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*app.get('/home', async (req, res) => {
  try {
    const database = mongoose.connection;
    const songsCollection = database.collection('songdetails');

    const songs = await songsCollection.find().toArray();
    res.json(songs);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/home/:songId', async (req, res) => {
  const songId = new mongoose.Types.ObjectId(req.params.songId);
  console.log(songId);
  try {
    const collection = mongoose.connection.db.collection('fs.files');
    collection.findOne({ _id: songId }, function (err, song) {
      console.log('finding song', song);
      if (err) {
        console.error('Error retrieving songs:', err);
        res.status(500).send('Error retrieving songs');
      } else if (!song) {
        console.error('Song not found');
        res.status(404).send('Song not found');
      } else {
        console.log('else case');
        const gfs = Grid(mongoose.connection.db, mongoose.mongo);
        const readStream = gfs.createReadStream({
          _id: song._id,
          root: 'fs',
        });
        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Disposition', `attachment; filename="${song.filename}"`);
        console.log(song.filename);
        console.log('File send successfully');
        readStream.pipe(res);
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    res.status(500).send('Failed to connect to MongoDB');
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, './build')));

// Refresh route
const pageRefresh = (request, response, next) => {
  response.sendFile(path.join(__dirname, './build/index.html'));
};

app.use((req, res, next) => {
  if (req.originalUrl === '/home') {
    next();
  } else {
    pageRefresh(req, res, next);
  }
});*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});