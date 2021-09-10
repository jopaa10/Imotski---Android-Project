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
});

mongoose.model('User', userSchema);
