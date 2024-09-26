const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  likedSongs: [{
    type: String,
  }],
});

likeSchema.index({ userId: 1, likedSongs: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
