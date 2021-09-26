const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');
const ProfilePic = mongoose.model('ProfilePic');

router.post('/signup', (req, res) => {
  console.log(req.body);

  const {name, surname, email, password, daysOfStaying, placeOfResidence} =
    req.body;

  if (
    !name ||
    !surname ||
    !email ||
    !password ||
    !daysOfStaying ||
    !placeOfResidence
  ) {
    return res.status(422).json({error: 'Please input all the fields'});
  }

  User.findOne({email: email})
    .then(savedUser => {
      if (savedUser) {
        return res
          .status(422)
          .json({error: 'User already exists with this email'});
      }

      bcrypt
        .hash(password, 12)
        .then(hashedpassword => {
          const user = new User({
            name,
            surname,
            email,
            password: hashedpassword,
            placeOfResidence,
            daysOfStaying,
          });
          user.save().then(user => {
            //res.json({message: 'User saved successfully'});
            const token = jwt.sign({_id: user._id}, JWT_SECRET);
            res.json({token});
          });
        })
        .catch(error => {
          console.log(error);
        });
    })

    .catch(error => {
      console.log(error);
    });
});

router.post('/signin', (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.status(422).json({error: 'Please input all the fields'});
  }

  User.findOne({email}).then(savedUser => {
    if (!savedUser) {
      return res
        .status(422)
        .json({error: 'Invalid email or password. Please try again'});
    }
    bcrypt
      .compare(password, savedUser.password)
      .then(doMatch => {
        if (doMatch) {
          //return res.json({message: 'signed successfully'});
          const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
          res.json({token});
        } else {
          return res
            .status(422)
            .json({error: 'Invalid email or password. Please try again'});
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
});

router.get('/protected', requireLogin, (req, res) => {
  //console.log(req.user);
  User.findById(req.user)
    .then(userData => res.json({userData}))
    .catch(error => {
      console.log(error);
    });
});

router.post('/newprofilepic', requireLogin, (req, res) => {
  const {pic} = req.body;
  if (!pic) {
    return res.status(422).json({error: 'Please add Your Profile pic!'});
  }
  const profilePic = new ProfilePic({
    pic,
    postedBy: req.user,
  });
  profilePic
    .save()
    .then(result => {
      res.json({result});
      //console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/profilepic', requireLogin, (req, res) => {
  ProfilePic.findOne({postedBy: req.user._id})
    .populate('postedBy', '_id name')
    .then(result => {
      res.json({result});
    })
    .catch(error => {
      console.log(error);
    });
});

router.put('/updatepic', requireLogin, (req, res) => {
  ProfilePic.findOneAndUpdate(
    {postedBy: req.user._id},
    {$set: {pic: req.body.pic}},
    {new: true},
    (err, result) => {
      if (err) {
        return res.status(422).json({error: 'pic cannot post'});
      }
      res.json(result);
    },
  );
});

module.exports = router;
