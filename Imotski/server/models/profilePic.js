const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const profilePicSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

mongoose.model('ProfilePic', profilePicSchema);
