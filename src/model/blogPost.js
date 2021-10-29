const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

BlogPostSchema.pre('remove', async function (next) {
    //this === user

    const Comment = mongoose.model('comment');
    await Comment.remove({ _id: { $in: this.comments}});
    next();
})


const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;

