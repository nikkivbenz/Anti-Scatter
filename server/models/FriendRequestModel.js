const mongoose = require('mongoose');
const User = require('./UserModel');

const FriendRequestScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    friendUsername: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Sent', 'Received'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FriendRequest = mongoose.model('FriendRequest', FriendRequestScheme);

module.exports = FriendRequest;