const assert = require('assert');
const UserModel = require('../src/userModel');


describe('Validating records', () => {

    it("Requires a user\'s name", () => {
        const user1 = new UserModel({ name: undefined });
        const validationResult = user1.validateSync();
        const {message} = validationResult.errors.name;
        
        assert(message === 'Name is required.');
    });

    it("Requires a user\'s name longer than 2 characters", () => {
        const user1 = new UserModel({ name: 'Us' });
        const validationResult = user1.validateSync();
        const {message} = validationResult.errors.name;
        
        assert(message === 'Name must be longer than 2 characters.');
    });

    it("Disallows invalid records from being saved", async () => {
        const user1 = new UserModel({ name: 'Us'  });
        
        try{
            await user1.save();
        }
        catch(validationResult)
        {
            const {message} = validationResult.errors.name;
            assert(message === 'Name must be longer than 2 characters.');
        }
        
    });
});