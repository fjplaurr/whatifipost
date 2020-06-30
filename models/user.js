const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    name: String,
    size: Number,
    mimetype: String,
    url: String,
  },
  nick: String,
  verificationCode: {
    type: String,
    required: true,
  },
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  ]
});

// Method to verify the password when doing login
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
