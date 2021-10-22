require('dotenv').config();
const Group = require('../models/group')
const moment = require('moment')
const today = moment().startOf('day')
const accountSid = 'ACc476d0e0eb5208e5b5c53ddd7a59c0dd'
const authToken = '23b97ffbf93cc9a20a795f7297575776'
const client = require('twilio')(accountSid, authToken)

exports.groupText = () => {
  
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

      
        //will need to loop through users and send a text to each
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


