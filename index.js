if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: `${__dirname}/.env` });
} else {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
// const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

// Database connection
const mongoose = require('mongoose');
const uri = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : process.env.MLAB_URI

mongoose.connect(uri, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

// Error handling
app.use(function (req, res, next) {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT,
  () => console.log(`Listening on port ${PORT}`)
);
