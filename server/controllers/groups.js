const User = require("../models/user");
const Group = require("../models/group");

exports.getGroup = (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  Group.findById(req.params.group, {
    posts: { $slice: [perPage * page - perPage, perPage] },
  })

    .populate({
      path: "posts",
      populate: {
        path: "author",
        model: "User",
        select: "userName",
      },
    })
    .exec((err, group) => {
      if (!group) {
        res.status(404).send("Group not found");
      } else if (err) {
        next(err);
      }

      res.send(group);
    });
};

exports.addGroup = (req, res) => {
  if (!req.body.title) {
    res.status(400).send("No title included in request body");
    return res.end();
  }
  User.findById(req.body.creator).exec((err, user) => {
    const newGroup = new Group({
      title: req.body.title,
      creator: req.body.creator,
      users: [],
      posts: [],
    });

    newGroup.users.push(req.body.creator);
    newGroup.save();
    user.groups.push(newGroup);
    user.save();
    res.status(200).send(newGroup);
  });
};

exports.editGroup = (req, res) => {
  const update = req.body;

  Group.findOneAndUpdate({ _id: req.params.group }, update, { new: true }).exec(
    (err, updatedGroup) => {
      if (err) next(err);
      res.status(200).json(updatedGroup);
    }
  );
};

exports.deleteGroup = (req, res) => {
  Group.deleteOne({ _id: req.params.board }).exec((err) => {
    if (err) next(err);
    res.status(200).send(req.params.board);
  });
};

exports.addUserToGroup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (!user) {
      res.status(404).send("User not found");
      return res.end();
    } else if (err) {
      next(err);
    }
    //check to see if user is already in group
    if (req.group.users.includes(user._id)) {
      res.status(400).send("User already in group");
      return res.end();
    }

    req.group.users.push(user._id);
    req.group.save();
    user.groups.push(req.group._id);
    user.save();
    res.status(200).send(user.email);
  });
};
