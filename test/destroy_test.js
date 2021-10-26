const assert = require('assert');
const UserModel = require('../src/userModel');


describe('Destroying records', () => {
    let user1;

    beforeEach(async () => {
        user1 = new UserModel({ name: 'User'});
        await user1.save();
    });

    it("Delete with model instance remove", async () => {
        await user1.remove();

        const user2 = await UserModel.findOne({ name: 'User'});
        assert(user2===null);
            
    });

    it("Delete with class method deleteMany", async() => {
        await UserModel.deleteMany({ name: 'User'});

        const user2 = await UserModel.findOne({ name: 'User'});
        assert(user2===null);
    });

    it("Delete with class method findOneAndRemove", async () => {
        await UserModel.findOneAndRemove({ name: 'User'});
        
        const user2 = await UserModel.findOne({ name: 'User'});
        assert(user2===null);
    });

    it("Delete with class method findByIdAndRemove", async() => {
        await UserModel.findByIdAndRemove(user1.id);

        const user2 = await UserModel.findOne({ name: 'User'});
        assert(user2===null);
    });
    
});