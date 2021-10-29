const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
});



const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        validate: {
            validator: (name) => name.length>2 ,
            message: 'Name must be longer than 2 characters.'
        }
    },
    likes: Number,
    posts: [PostSchema], //Document Embed
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost' 
    }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

UserSchema.pre('remove', async function (next) {
    //this === user

    this.populate({
        path: 'blogPosts',
        model: 'blogPost'
    });

    const BlogPost = mongoose.model('blogPost');
    await BlogPost.remove({ _id: { $in: this.blogPosts}});
    next();
})


const User = mongoose.model('user', UserSchema);

module.exports = User;

