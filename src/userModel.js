const mongoose = require('mongoose');
const UserSchema = require('./userSchema');


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

