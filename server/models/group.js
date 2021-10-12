const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post')

const groupSchema = new Schema({
  title: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
})

groupSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  const group = await this.model.findOne(this.getFilter());

  group.model('Post').deleteMany({group: group._id}, next)
})
module.exports = mongoose.model("Group", groupSchema)