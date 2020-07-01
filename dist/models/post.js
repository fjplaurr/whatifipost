"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
    text: String,
    date: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
exports.default = mongoose.model('Post', postSchema);
//# sourceMappingURL=post.js.map