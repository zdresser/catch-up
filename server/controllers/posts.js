const User = require('../models/user')
const Group = require('../models/group')
const Post = require('../models/post')

exports.getPosts = (req, res) => {
  Group.findById(req.params.group)
    //probably need to populate some stuff
    .exec((err, group) => {
      if (err) next(err)
      res.status(200).json(group.posts)
    })
}

exports.getPost = (req, res) => {
  Post.findById(req.params.post)
    .exec((err, post) => {
      if (err) next(err)
      res.status(200).json(post)
    })
}

exports.addPost = (req, res) => {
  Group.findById(req.params.group)
    .exec((err, group) => {
      if (err) next(err)

      const newPost = new Post({
        author: req.body.userId,
        text: req.body.text,
        group: group._id,
        comments: [],
        upvotes: 0
      })

      newPost.save();
      group.posts.push(newPost);
      group.save();
      res.status(200).send(newPost);
    })
}

exports.editPost = (req, res) => {
  if (!req.body) {
    res.status(400).send("No update information included in request body")
    return res.end();
  }

  const update = req.body; 
  Post.findOneAndUpdate({ _id: req.params.post }, update, { new: true })
    .exec((err, updatedPost) => {
      if (err) next(err)
      console.log(updatedPost)
      res.status(200).json(updatedPost)
    })
}

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.post._id })
    .then(() => {
      Group.updateOne({ _id: req.post.group }, { '$pull': { 'posts': req.post._id } })
        .exec(err => {
          if (err) next(err)

          const deleteData = {
            post: req.post._id,
            group: req.post.group
          }
          res.status(200).send(deleteData)
        })
    })
}