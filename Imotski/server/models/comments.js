const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Comment', commentSchema);
