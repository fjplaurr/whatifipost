const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema);
