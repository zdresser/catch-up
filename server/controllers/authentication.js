const jwt = require('jwt-simple');
const keys = require('../config/dev')
const User = require('../models/user')

const tokenForUser = (user) => {
  return jwt.encode({ 
    sub: user._id,
    iat: Math.round(Date.now() / 1000),
    //no expiry b/c issuing to mobile app
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
      const token = tokenForUser(user)
     
      res.status(200).send({
        userName: user.userName,
        groups: user.groups,
        voteRecord: user.voteRecord,
        _id: user._id,
        token: token 
      })
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
    const user = new User({
      email: email,
      userName: req.body.userName,
      phone: req.body.phone
    });
   
    user.setPassword(password);

    user.save((err, user) => {
      if (err) { return next(err); } 

      // Repond to request indicating the user was created
      // res.json({ token: tokenForUser(user) });
      res.status(200).send(user)
    });
  });
}

exports.addToVoteRecord = (req, res) => {
 
  User.findById(req.params.user)
    .exec((err, user) => {
      if (!user) {
        res.status(404).send("User not found")
      } else if (err) {
        next(err)
      }
      
      user.voteRecord.push({
        post: req.body.post,
        vote: req.body.vote
      })

      user.save();
      res.status(200).send(user)
    })
}

exports.updateVotes = (req, res) => {
  User.findOneAndUpdate({
    _id: req.params.user,
    "voteRecord.post": req.body.post
  },
  {
    $set: {"voteRecord.$.vote" : req.body.vote }
  },{new: true})
    .exec((err, user) => {
      if (!user) {
        res.status(404).send("User not found")
      } else if (err) {
        next(err)
      }
      res.status(200).send(user)
    })
}
  
