const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  created: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  group: { type: Schema.Types.ObjectId, ref: "Group" },
},
{
  timestamps: true
  })

postSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  const post = await this.model.findOne(this.getFilter());
  post.model('Comment').deleteMany({post: post._id}, next)
  })

postSchema.pre('deleteMany', { document: false, query: true }, async function (next) {
  const posts = await this.model.find(this.getFilter());

  const ids = posts.map(post => {
    return post._id
  })
  
  //Delete comments made on posts to be deleted
  posts[0].model('Comment').deleteMany({ post: { '$in': ids } }, next);
})
module.exports = mongoose.model("Post", postSchema)