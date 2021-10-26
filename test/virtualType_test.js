const assert = require('assert');
const UserModel = require('../src/userModel');

describe('Handling Virtual Types', () => {
    it("Validates if ponstCount returns number of posts", async () => {
        const user1 = new UserModel({ 
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

        const user2 = await UserModel.findOne({ name: 'User' });
        assert(user2.postCount === user2.posts.length);
    });
 
});