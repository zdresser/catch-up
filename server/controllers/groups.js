const User = require('../models/user')
const Group = require('../models/group')

exports.getGroups = (req, res) => {
  Group.find({}) //edit when users are added
    .exec((err, groups) => {
      if (err) return next(err);
      res.status(200).json(groups);
    });
}

exports.getGroup = (req, res, next) => {
  Group.findById(req.params.group)
    .exec((err, group) => {
      if (!group) {
        res.status(404).send("Group not found")
      } else if (err) {
        next(err)
      }
      res.send(group)
    })
}

exports.addGroup = (req, res) => {
  if (!req.body.title) {
    res.status(400).send("No title included in request body")
    return res.end();
  }

  User.findById(req.body.userId)
    .exec((err, user) => {
      const newGroup = new Group({
        title: req.body.title,
        users: [],
        posts: []
      })
      
      newGroup.users.push(user._id);
      newGroup.save()
      user.groups.push(newGroup);
      user.save();
      res.status(200).send(newGroup)
    })
}

exports.editGroup = (req, res) => {
  const update = req.body
  
  Group.findOneAndUpdate({ _id: req.params.group }, update, { new: true })
    .exec((err, updatedGroup) => {
      if (err) next(err);
      res.status(200).json(updatedGroup)
    })
}

exports.deleteGroup = (req, res) => {
  Group.deleteOne({ _id: req.params.board })
    .exec(err => {
      if (err) next(err)
      res.status(200).send(req.params.board)
    })
}