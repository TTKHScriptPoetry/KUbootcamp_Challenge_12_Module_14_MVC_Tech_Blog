 const User = require('./User');
const Post = require("./Post");
const Comment = require("./Comment");

// create associations
User.hasMany(Post, {
   foreignKey: 'user_id' //user_id in the Post model, where user_id thus is a foreigh key
 })

 // assert the reverse association 
Post.belongsTo(User, {
foreignKey: 'user_id',
}); 
 
// Comment model relationship
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };