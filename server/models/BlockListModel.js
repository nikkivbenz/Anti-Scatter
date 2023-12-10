const mongoose = require('mongoose');
const User = require('./UserModel');

const BlockListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    blockWebsites: {
        type: [String],
        required: true
    }
});

const BlockList = mongoose.model('BlockList', BlockListSchema);

module.exports = BlockList;
