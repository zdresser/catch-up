const jwt = require('jwt-simple');
const keys = require('../config/dev')
const User = require('../models/user')

const tokenForUser = (user) => {
  return jwt.encode({ 
    sub: user._id,
    iat: Math.round(Date.now() / 1000),
    }, 
    keys.TOKEN_SECRET)
};

exports.login = (req, res) => {
  
  User.findOne({ email: req.body.email })
    .populate('groups')
    .exec((err, user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else if (err) {
        next(err)
      }
      console.log(user._id)
      res.status(200).send(user)
      // res.send({
      //   username: user.username,
      //   token: tokenForUser(user),
      //   groups: user.groups,
      //   _id: user._id
      // })
    })
};

exports.currentUser = function(req, res) {
  const user = {
    name: req.user.name,
    token: tokenForUser(req.user)
  };

  res.send(user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.signup = (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User();

    user.email = email;

    user.setPassword(password);

    user.save((err, user) => {
      if (err) { return next(err); } 

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}