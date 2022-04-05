const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');

const ProfilePic = mongoose.model('ProfilePic');
const Comment = mongoose.model('Comment');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
  '235557348041-ejo2smfsfc77lgo7prmognfevgqf8o1s.apps.googleusercontent.com',
);

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

  /* if (
    name === null ||
    surname === null ||
    email === null ||
    password === null ||
    daysOfStaying === null ||
    placeOfResidence === null
  ) {
    return res.status(422).json({error: 'Please input all the fields'});
  } */

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

  if (!email || !password || email === '' || password === '') {
    return res.status(422).json({error: 'Please input all the fields'});
  }

  if (email === null && password === null) {
    return res.status(422).json({error: 'Please input all the fields'});
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
          const {
            _id,
            name,
            surname,
            email,
            password,
            daysOfStaying,
            placeOfResidence,
          } = savedUser;
          res.json({
            token,
            user: {
              _id,
              name,
              surname,
              email,
              password,
              daysOfStaying,
              placeOfResidence,
            },
          });
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

router.post('/addplace', requireLogin, (req, res) => {
  const {placeOfResidence} = req.body;

  if (!placeOfResidence) {
    return res
      .status(422)
      .json({error: 'Please add Your place od staying during vacations'});
  }

  User.findByIdAndUpdate(
    {_id: req.user._id},
    {$set: {placeOfResidence: req.body.placeOfResidence}},
    {new: true},
    (err, result) => {
      if (err) {
        return res.status(422).json({error: 'Place cannot be added!'});
      } else {
        res.json({result});
      }
    },
  );
});

router.post('/daysofstaying', requireLogin, (req, res) => {
  const {daysOfStaying} = req.body;

  if (!daysOfStaying) {
    return res
      .status(422)
      .json({error: 'Please add how much days You will be on vacations'});
  }

  User.findByIdAndUpdate(
    {_id: req.user._id},
    {$set: {daysOfStaying: req.body.daysOfStaying}},
    {new: true},
    (err, result) => {
      if (err) {
        return res.status(422).json({error: 'Something went wrong...'});
      } else {
        res.json({result});
      }
    },
  );
});

/* router.get('/profilepic', requireLogin, (req, res) => {
  User.findById({_id: req.user._id})

    .then(result => {
      res.json({result});
    })
    .catch(error => {
      console.log(error);
    });
}); */

router.put('/updatepic', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    {_id: req.user._id},
    {$set: {photo: req.body.photo}},
    {new: true},
    (err, result) => {
      if (err) {
        return res.status(422).json({error: 'pic cannot post'});
      }
      res.json(result);
    },
  );
});

/* router.get('/daysofstaying', requireLogin, (req, res) => {
  User.findById(req.user)
    .then(userData => res.json({userData}))
    .catch(error => {
      console.log(error);
    });
}); */

router.post('/createcomment', requireLogin, (req, res) => {
  const {body, catg} = req.body;
  if (!body) {
    return res.status(422).json({error: 'Please add your comment'});
  }

  const commentBox = new Comment({
    body,
    postedBy: req.user,
    time: new Date(),
    catg,
  });

  commentBox
    .save()
    .then(result => {
      res.json({result});
    })
    .catch(error => console.log(error));
});

router.get('/allcomments', (req, res) => {
  Comment.find()
    .populate('postedBy', '_id name photo')
    .then(comments => {
      res.json({comments});
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/googlelogin', (req, res) => {
  const {googleId} = req.body;

  client
    .verifyIdToken({
      idToken: googleId,
      audience:
        '235557348041-ejo2smfsfc77lgo7prmognfevgqf8o1s.apps.googleusercontent.com',
    })
    .then(response => {
      const {email_verified, given_name, family_name, email} = response.payload;

      if (email_verified) {
        User.findOne({email}).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: 'Something went wrong...',
            });
          } else {
            if (user) {
              const token = jwt.sign({_id: user._id}, JWT_SECRET);
              const {_id, name, surname, email} = user;

              res.json({
                token,
                user: {_id, name, email},
              });
            } else {
              let password = email + JWT_SECRET;
              let newUser = new User({
                name: given_name,
                surname: family_name,
                email,
                password,
              });

              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    err: 'Something went wrong...',
                  });
                }
                const token = jwt.sign({_id: data._id}, JWT_SECRET);
                const {_id, given_name, family_name, email} = newUser;

                res.json({
                  token,
                  user: {_id, given_name, family_name, email},
                });
              });
            }
          }
        });
      }
    });

  //console.log(googleId);
});

module.exports = router;
