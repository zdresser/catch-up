const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
  username: {
    type: String,
   
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
   
  },
  phone: {
    type: String,
    
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
})

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

userSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  //delete posts and comments user made or not? That's a complicated cascade, and we may want to keep threads alive
})

module.exports = mongoose.model("User", userSchema)