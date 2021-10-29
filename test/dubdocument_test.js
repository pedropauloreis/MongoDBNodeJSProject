const assert = require('assert');
const User = require('../src/model/User');

describe('Handling Subdocuments', () => {
    it("Saves a User with posts", async () => {
        const user1 = new User({ 
            name: 'User',
            posts: [
                {
                    title: 'Post Title 1',
                    content: 'Post Content 1'
                },
                {
                    title: 'Post Title 2',
                    content: 'Post Content 2'
                },
            ]
        });
        await user1.save();

        const user2 = await User.findOne({ name: 'User' });
        assert(user2.posts.length === 2);
        assert(user2.posts[0].title === 'Post Title 1');
        
    });

    it("Creates a post in existing user", async () => {
        const user1 = new User({ name: 'User', posts: []});
        await user1.save();
        
        const user2 = await User.findOne({ name: 'User'});
        user2.posts.push({ title: 'Post Title 1', content: 'Post Content 1'});
        await user2.save();
        
        const user3 = await User.findOne({ name: 'User'});
        assert(user3.posts.length === 1);
        assert(user3.posts[0].title === 'Post Title 1');
    });

    it("Removes a post of existing user", async () => {
        const user1 = new User({ name: 'User', posts: [
            { title: 'Post Title 1', content: 'Post Content 1'},
            { title: 'Post Title 2', content: 'Post Content 2'},
        ]});
        await user1.save();
        
        const user2 = await User.findOne({ name: 'User'});
        await user2.posts[0].remove();
        await user2.save();
        
        const user3 = await User.findOne({ name: 'User'});
        assert(user3.posts.length === 1);
        assert(user3.posts[0].title === 'Post Title 2');
    });
    
});