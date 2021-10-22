const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ProfilePic = mongoose.model('ProfilePic');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    res.status(401).json({error: 'you must be logged in'});
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({error: 'you must be logged in'});
    }

    const {_id} = payload;

    /*    ProfilePic.findOneAndUpdate({postedBy: _id}).then(proData => {
      req.avatar = proData;
      //next();
      console.log(proData);
    }); */

    User.findById(_id).then(userData => {
      req.user = userData;
      next();
    });
  });
};
