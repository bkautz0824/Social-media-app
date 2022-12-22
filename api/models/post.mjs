import mongoose from 'mongoose';
import commentSchema from './comment.mjs';
import User from './user.mjs'

const snakeCaseStamps = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
};
const Post = mongoose.model('Post', new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author: {
   type: mongoose.Schema.Types.ObjectId,
   ref: User
  },
  title: { type: String, minlength: 1, maxlength: 100 },
  text: { type: String, minlength: 2, maxlength: 400 },
  comments: {
    type: [commentSchema]
  },
  category: { type: String, required: true, trim: true},
  images: {
    type: [{
      type:
        String,
      maxItems: 8
    }]
  },
  likes_count: { type: Number, default: 0 },
  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  saved_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
}, snakeCaseStamps))
export default Post;