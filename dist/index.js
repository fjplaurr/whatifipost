"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var routes_1 = require("./routes");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: __dirname + "/.env" });
}
else {
    dotenv.config();
}
var app = express();
// Database connection
var uri = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : process.env.MLAB_URI;
uri && mongoose.connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/users', routes_1.usersRoutes);
app.use('/api/posts', routes_1.postsRoutes);
// Error handling
app.use(function (req, res, next) {
    var err = new Error('Not found');
    next(err);
});
// Server listening
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
//# sourceMappingURL=index.js.map