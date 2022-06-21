const mongoose = require('mongoose');

//Schema - new user with username, password, date, adminStatus
const schema = mongoose.Schema;
const UserSchema = new schema({
    username: String,
    password: String,
    email: String,
    privilege: String,
    date:{
        type:String,
        default:Date.now()
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;