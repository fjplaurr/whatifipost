"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/order
const config_1 = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const serialize_error_1 = require("serialize-error");
const routes_1 = require("./routes");
// Initializes express application
const app = express();
// Database connection
const uri = config_1.default.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : config_1.default.MLAB_URI;
const startMongoConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        uri && (yield mongoose.connect(uri, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }));
    }
    catch (error) {
        console.log('The connection to Mongodb was not successful');
    }
});
startMongoConnection();
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/users', routes_1.usersRoutes);
app.use('/api/posts', routes_1.postsRoutes);
app.use('/api/auth', routes_1.authRoutes);
app.use('/api/image-upload', routes_1.fileRoutes);
// Express default error handling
const errorHandler = (err, req, res, next) => {
    // Handles errors for headers that have already been sent to the client
    if (res.headersSent) {
        return next(err);
    }
    const serializedError = serialize_error_1.serializeError(err);
    return res.status(500).send({ error: serializedError });
};
app.use(errorHandler);
// Server listening
const port = config_1.default.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
//# sourceMappingURL=index.js.map