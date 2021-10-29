const assert = require('assert');
const User = require('../src/model/User');

describe('Creating records', () => {
    
    it("Saves a User", async () => {
        const user1 = new User({ name: 'User 1'});
        await user1.save();
        assert(!user1.isNew);
    });
    
});