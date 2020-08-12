
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: `${__dirname}/.env` });
} else {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
const buildFolder = path.join(__dirname, '..', '/frontend', '/build');
console.log(buildFolder)
app.use(express.static(buildFolder));
console.log(buildFolder)

// Routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildFolder, 'index.html'));
});

// Server listening
app.listen(PORT, () => console.log(`listening on port ${PORT}`));