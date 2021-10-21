const moment = require('moment')
const today = moment().startOf('day')

//find group updated today
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

      const groupText = group.users.map(user => user.phone)
      

      //send out topPost to groupText
    })
    
  })