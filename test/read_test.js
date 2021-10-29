const assert = require('assert');
const User = require('../src/model/User');


describe('Reading records', () => {
    let user1;

    beforeEach(async () => {
        user1 = new User({ name: 'User'});
        await user1.save();
    });

    it("Find all users with a name of 'User'", async () => {
        const users = await User.find( {name: 'User'} )
        assert(user1._id.toString() === users[0]._id.toString());
    });

    it("Find a users with a particular id", async () => {
        const user = await User.findOne( {_id: user1._id} );
        assert(user1.name === user.name);
    });


    it("cab skip and limit a user collection", async () => {
        const newUsers = [ new User({ name: 'User2'}), new User({ name: 'User3'}), new User({ name: 'User4'}), new User({ name: 'User5'})];
        
        await Promise.all( newUsers.map(async user => await user.save()));

        const countUser = await User.count();
        assert(countUser === 5);

        const users = await User.find({}).sort({ name: 1}).skip(1).limit(2);
        assert(users.length === 2);
        assert(users[0].name === 'User2');
        assert(users[1].name === 'User3');
        
    });
    
});