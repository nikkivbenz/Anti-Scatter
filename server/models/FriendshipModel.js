const mongoose = require('mongoose');
const User = require('./UserModel');

const FriendshipScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    friendUsername: {
        type: String,
        required: true
    },
    acceptedAt: {
        type: Date
    }
});

const Friendship = mongoose.model('Friendship', FriendshipScheme);

module.exports = Friendship;