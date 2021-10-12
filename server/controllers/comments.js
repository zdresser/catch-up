const Post = require('../models/post')
const Comment = require('../models/comment')
const { UserInterfaceIdiom } = require('expo-constants')

exports.getComments = (req, res) => {
  Post.findById(req.params.post)
    .exec((err, post) => {
      if (err) next(err)
      res.status(200).send(post.comments)
    })
}

exports.getComment = (req, res) => {
  Comment.findById(req.params.comment)
    .exec((err, comment) => {
      if (err) next(err)
      res.status(200).send(comment)
    })
}

exports.addComment = (req, res) => {
  Post.findById(req.params.post)
    .exec((err, post) => {
      if (err) next(err)

      const newComment = new Comment({
        text: req.body.text,
        author: req.body.userId,
        post: req.params.post
      })

      newComment.save();
      post.comments.push(newComment);
      post.save();
      res.status(200).send(newComment);
    })
}

exports.editComment = (req, res) => {
  if (!req.body) {
    res.status(400).send("No update information included in request body")
    return res.end();
  }

  const update = req.body;

  Comment.findOneAndUpdate({ _id: req.params.comment }, update, { new: true })
    .exec((err, updatedComment) => {
      if (err) next(err)
      res.status(200).json(updatedComment)
    })
}

exports.deleteComment = (req, res) => {
  Comment.deleteOne({ _id: req.comment._id })
    .then(() => {
      Post.updateOne({ _id: req.comment.post }, { '$pull': { 'comments': req.comment._id } })
        .then(() => {
          User.updateOne({ _id: req.comment.user }, { '$pull': { 'comments': req.comment._id } })
            .exec(err => {
              if (err) next(err)
              res.status(200).send(req.comment._id)
            })
        })
    })
}