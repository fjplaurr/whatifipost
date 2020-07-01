import * as mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  text: String,
  date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Post', postSchema);
