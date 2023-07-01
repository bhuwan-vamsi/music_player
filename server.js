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

//userSchema
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

/*
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
});
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});