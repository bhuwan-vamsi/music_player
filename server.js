const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//connect
const path=require("path");
app.use(express.static(path.join(__dirname,'./build')))
//refresh
const pageRefresh=(request,response,next)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
}

app.use((req, res, next) => {
  if (req.originalUrl === '/home') {
    next();
  } else {
    pageRefresh(req, res, next);
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/musicdetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  }
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
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

app.post('/login', async (req, res) => {
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

app.get('/home', async (req, res) => {
  try {
    const database = mongoose.connection;
    const songsCollection = database.collection('songdetails');

    const songs = await songsCollection.find().toArray();
    console.log(songs);
    res.json(songs);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
