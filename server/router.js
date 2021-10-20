const express = require("express");
const app = express();
const passport = require('passport');

//import models
const Comment = require('./models/comment')
const User = require('./models/user')
const Group = require('./models/group')
const Post = require('./models/post')

//import controllers
const Groups = require('./controllers/groups');
const Posts = require('./controllers/posts')
const Comments = require('./controllers/comments')
const Authentication = require('./controllers/authentication')

//auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//routes
module.exports = (app) => {
//fetches a group

  app.param('group', (req, res, next, id) => {
   
    Group.findById(id)
      .exec((err, group) => {
        if (!group) {
          res.status(404).send('Group not found');
          return res.end();
        } else if (err) {
          next(err)
        }
        
        req.group = group;
        next();
      })
  })
  
  //fetches a post
  app.param('post', (req, res, next, id) => {
    Post.findById(id)
      .exec((err, post) => {
        if (!post) {
          res.status(404).send('Post not found');
          return res.end();
        } else if (err) {
          next(err);
        }
  
        req.post = post;
        next();
      })
  })
  
  //fetches a comment
  app.param('comment', (req, res, next, id) => {
    Comment.findById(id)
      .exec((err, comment) => {
        if (!comment) {
          res.status(404).send('Comment not found');
          return res.end();
        } else if (err) {
          next(err);
        }
  
        req.comment = comment;
        next();
      })
  })

  app.get("/api/groups/:group", Groups.getGroup)
  app.post('/api/groups', Groups.addGroup)
  app.put('/api/groups/:group', Groups.editGroup)
  app.delete('/api/groups/:group', Groups.deleteGroup)
  app.post('/api/groups/:group/add', Groups.addUserToGroup)


  app.get('/api/groups/:group/posts', Posts.getPosts)
  app.post('/api/groups/:group/posts', Posts.addPost)

  app.get('/api/posts/:post', Posts.getPost)
  app.put('/api/posts/:post', Posts.editPost)
  app.delete('/api/posts/:post', Posts.deletePost)

  app.get('/api/posts/:post/comments', Comments.getComments) //unnecessary
  app.post('/api/posts/:post/comments', Comments.addComment)
  app.get('/api/comments/:comment', Comments.getComment) //unnecesary
  app.put('/api/comments/:comment', Comments.editComment)
  app.delete('/api/comments/:comment', Comments.deleteComment)


  app.post('/auth/login', Authentication.login);
  app.post('/auth/logout', Authentication.logout),
  app.post('/auth/signup', Authentication.signup),
  app.get('/auth/current_user', Authentication.currentUser)
  
  app.post('/api/users/:user', Authentication.addToVoteRecord)
  app.put('/api/users/:user', Authentication.updateVotes)
  
}