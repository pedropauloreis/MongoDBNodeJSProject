const assert = require('assert');
const User = require('../src/model/User');


describe('Destroying records', () => {
    let user1;

    beforeEach(async () => {
        user1 = new User({ name: 'User'});
        await user1.save();
    });

    it("Delete with model instance remove", async () => {
        await user1.remove();

        const user2 = await User.findOne({ name: 'User'});
        assert(user2===null);
            
    });

    it("Delete with class method deleteMany", async() => {
        await User.deleteMany({ name: 'User'});

        const user2 = await User.findOne({ name: 'User'});
        assert(user2===null);
    });

    it("Delete with class method findOneAndRemove", async () => {
        await User.findOneAndRemove({ name: 'User'});
        
        const user2 = await User.findOne({ name: 'User'});
        assert(user2===null);
    });

    it("Delete with class method findByIdAndRemove", async() => {
        await User.findByIdAndRemove(user1.id);

        const user2 = await User.findOne({ name: 'User'});
        assert(user2===null);
    });
    
});