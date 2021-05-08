const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const PostComment = require('./PostComment');

User.hasMany(Post, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_name'
});

User.hasMany(Comment, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'   
});

Comment.belongsTo(User, {
    foreignKey: 'user_name'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    through: PostComment
});

Comment.hasOne(Post, {
    foreignKey: 'comment_id',
    through: PostComment
});

module.exports = { 
    User, 
    Post, 
    Comment, 
    PostComment 
};