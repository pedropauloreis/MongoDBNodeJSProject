const assert = require('assert');
const User = require('../src/model/User');


describe('Updating records', () => {
    let user1;

    beforeEach(async () => {
        user1 = new User({ name: 'User', likes: 0});
        await user1.save();
    });

    const assertName = async operation => {
        await operation;
        const users = await User.find({});
        assert(users.length === 1);
        assert(users[0].name === 'NotUserAnymore');
    }

    it("Update with model instance set and save", async () => {
        user1.set('name', 'NotUserAnymore');
        await assertName(user1.save());
    });

    it("Update with model instance update", async () => {
        await assertName(user1.update({ name: 'NotUserAnymore'}));
    });

    it("Update with class method update", async () => {
        await assertName(User.update({ name: 'User'},{ name: 'NotUserAnymore'}));
    });

    it("Update with class method findOneAndUpdate", async () => {
        await assertName(User.findOneAndUpdate({ name: 'User'},{ name: 'NotUserAnymore'}));
    });

    it("Update with class method findByIdAndUpdate", async () => {
        await assertName(User.findByIdAndUpdate(user1.id,{ name: 'NotUserAnymore'}));
    });
   

    it("Increment Users likes by 1", async () => {
        await User.update({ name: 'User' }, { $inc: { likes: 1 } });
        
        const user1 = await User.findOne({ name: 'User' });
        assert(user1.likes === 1);
    });
});