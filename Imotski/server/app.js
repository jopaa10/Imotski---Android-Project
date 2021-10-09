const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 5000;

const mongoUri =
  'mongodb+srv://jopaa10:g2iMNxZkgdNmNw8A@cluster0.byqvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeaaa');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

require('./models/user');
require('./models/profilePic');
require('./models/comments');

app.use(express.json());
app.use(require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log('server is running on', PORT);
});
