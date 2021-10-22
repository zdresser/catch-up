require('dotenv').config()
const Group = require('../models/group')
const moment = require('moment')
const today = moment().startOf('day')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

exports.groupText = () => {
  //find all groups with activity in the current day
  Group.find({
    updatedAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate()
    }
  })
    .populate('posts')
    .populate("users", "phone")
    .exec((err, groups) => {

      groups.forEach(group => {
        const posts = group.posts.filter(post => post.createdAt >= today.toDate())
        posts.sort((a, b) => (a.upVotes > b.upvotes) ? 1 : -1)
        const topPost = posts[0]
      
        //loop through users and send a text to each
        group.users.forEach(user => {
          client.messages
          .create({
            body: "Today's top post: " + topPost.text + ' ' + topPost.link,
            from: '+19196666517',
            to: user.phone
          })
          .then(message => console.log(message))
        })
      })
    
    })
}


