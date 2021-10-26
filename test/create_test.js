const assert = require('assert');
const UserModel = require('../src/userModel');

describe('Creating records', () => {
    
    it("Saves a User", async () => {
        const user1 = new UserModel({ name: 'User 1'});
        await user1.save();
        assert(!user1.isNew);
    });
    
});