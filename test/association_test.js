const assert = require('assert');
const User = require('../src/model/User');
const Comment = require('../src/model/Comment');
const BlogPost = require('../src/model/BlogPost');

describe('Creating associated records', () => {

    let user1;
    let blogPost1;
    let comment1;

    beforeEach(async () => {
        user1 = new User({ name: 'User'});
        blogPost1 = new BlogPost({ title: 'BlogPost Title', content: 'BlogPost Content'});
        comment1 = new Comment({ content: 'Comment Content'});
        

        user1.blogPosts.push(blogPost1);
        blogPost1.comments.push(comment1);
        comment1.user = user1;

        await user1.save();
        await blogPost1.save();
        await comment1.save();
    });

    
    it("saves a relation between a user and a blogPost", async () => {
        const user = await User.findOne({name: 'User'}).populate('blogPosts');
        assert(user.blogPosts.length === 1);
        assert(user.blogPosts[0].title === 'BlogPost Title');
    });

    it("saves a full relation graph", async () => {
        const user = await User.findOne({name: 'User'}).populate({
            path: 'blogPosts',
            model: 'blogPost',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            },
        });
        assert(user.blogPosts.length === 1);
        assert(user.blogPosts[0].title === 'BlogPost Title');
        assert(user.blogPosts[0].comments.length === 1);
        assert(user.blogPosts[0].comments[0].content === 'Comment Content');
        assert(user.blogPosts[0].comments[0].user.name === 'User');
    });
    
});