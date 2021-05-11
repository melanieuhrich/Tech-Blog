const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const PostComment = require('./PostComment');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'   
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { 
    User, 
    Post, 
    Comment, 
    PostComment 
};