const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  daysOfStaying: {
    type: String,
    require: true,
  },
  placeOfResidence: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    default:
      'https://res.cloudinary.com/jopaa10/image/upload/v1632343549/userPhoto_ch87iu.jpg',
  },
  googleId: {
    type: String,
  },
});

mongoose.model('User', userSchema);
