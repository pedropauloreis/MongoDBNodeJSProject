const assert = require('assert');
const UserModel = require('../src/userModel');


describe('Reading records', () => {
    let user1;

    beforeEach(async () => {
        user1 = new UserModel({ name: 'User'});
        await user1.save();
    });

    it("Find all users with a name of 'User'", async () => {
        const users = await UserModel.find( {name: 'User'} )
        assert(user1._id.toString() === users[0]._id.toString());
    });

    it("Find a users with a particular id", async () => {
        const user = await UserModel.findOne( {_id: user1._id} );
        assert(user1.name === user.name);
    });
    
});