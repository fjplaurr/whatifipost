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
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes_1 = require("./routes");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: `${__dirname}/.env` });
}
else {
    dotenv.config();
}
const app = express();
// Database connection
const uri = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : process.env.MLAB_URI;
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
// Error handling
app.use((req, res, next) => {
    const err = new Error('Not found');
    next(err);
});
// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//# sourceMappingURL=index.js.map