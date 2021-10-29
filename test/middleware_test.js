const assert = require('assert');
const User = require('../src/model/User');
const BlogPost = require('../src/model/BlogPost');

describe('Handling middlewares', () => {

    let user1;
    let blogPost1;


    beforeEach(async () => {
        user1 = new User({ name: 'User'});
        blogPost1 = new BlogPost({ title: 'BlogPost Title', content: 'BlogPost Content'});
        

        user1.blogPosts.push(blogPost1);
  
        await user1.save();
        await blogPost1.save();
  
    });

    
    it("users clean up dangling blogposts on delete", async () => {
        const usercount1 = await User.count();
        const blogPostcount1 = await BlogPost.count();


        assert(usercount1 === 1 && blogPostcount1 === 1);
        
        await user1.remove();

        const usercount2 = await User.count();
        const blogPostcount2 = await BlogPost.count();


        assert(usercount2 === 0 && blogPostcount2===0 );

        
    });

});