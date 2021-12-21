const mongoose = require('mongoose');

const User = new mongoose.Schema({
    mobileEmail: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    liked : { type: Array }
}, { collection: 'User'});

const user = mongoose.model('user', User);

module.exports = user;