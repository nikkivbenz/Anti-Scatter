const Friendship = require('../models/FriendshipModel');
const User = require('../models/UserModel');

// Retrieve all friends of a user
module.exports.getFriends = async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!userId) {
            return res.status(400).json({ message: "requesterId is required" });
        }

        // Find all friendships where the RequesterId or AddresseeId matches the provided userId
        const friendships = await Friendship.find({ userId });

        res.status(200).json({ message: "Friends List fetched successfully", friendships});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Deletes a friend request or a friendship
module.exports.deleteFriend = async (req, res) => {
    const friendshipId = req.body.friendshipId;
    try {
        const friendship = await Friendship.findOneAndDelete({_id: friendshipId});
        if (!friendship) {
            return res.status(400).json({ message: "Friendship does not exist" });
        }

        const friendUser = await User.findOne({ username: friendship.friendUsername });
        const user = await User.findOne({ _id: friendship.userId })
        const deleteFriendship = await Friendship.findOneAndDelete({userId: friendUser._id, friendUsername: user.username})
        res.status(200).json({ message: "Friendship deleted successfully", friendship });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
