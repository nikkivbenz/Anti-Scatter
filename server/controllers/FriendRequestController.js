const User = require('../models/UserModel');
const FriendRequest = require('../models/FriendRequestModel');
const Friendship = require('../models/FriendshipModel');

// Retrieve all friend requests of a user
module.exports.getFriendRequestsReceived = async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        // Find all friendships where the userId is the user
        const friendRequests = await FriendRequest.find({ userId, status: 'Received' });

        res.status(200).json({ message: "Friend Requests fetched successfully", friendRequests});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Retrieve all friend requests of a user
module.exports.getFriendRequestsSent = async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        // Find all friendships where the userId is the user
        const friendRequests = await FriendRequest.find({ userId, status: 'Sent' });

        res.status(200).json({ message: "Friend Requests fetched successfully", friendRequests});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Reject a friend request
module.exports.rejectFriendRequest = async (req, res) => {
    const friendRequestId= req.body.friendRequestId;
    try {
        const friendRequest = await FriendRequest.findOneAndDelete({_id: friendRequestId});
        if (!friendRequest) {
            return res.status(400).json({ message: "Friend Request does not exist" });
        }
        const friendUser = await User.findOne({ username: friendRequest.friendUsername });
        const user = await User.findOne({ _id: friendRequest.userId })
        
        const deleteFriendRequest = await FriendRequest.findOneAndDelete({userId: friendUser._id, friendUsername: user.username})
        res.status(200).json({ message: "Friend Request rejected successfully", friendRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Accept a friend request
module.exports.acceptFriendRequest = async (req, res) => {
    const friendRequestId = req.body.friendRequestId;

    try {
        const friendRequest = await FriendRequest.findOneAndDelete({_id: friendRequestId});
        if (!friendRequest) {
            return res.status(400).json({ message: "Friend Request does not exist" });
        }
        const friendUser = await User.findOne({ username: friendRequest.friendUsername });
        const user = await User.findOne({ _id: friendRequest.userId })

        const deleteFriendRequest = await FriendRequest.findOneAndDelete({userId: friendUser._id, friendUsername: user.username})
        const friendFriendship = await Friendship.create({ userId: friendUser._id, friendUsername: user.username, acceptedAt: new Date() });
        const userFriendship = await Friendship.create({ userId: friendRequest.userId, friendUsername: friendRequest.friendUsername, acceptedAt: new Date() });
        res.status(200).json({ message: "Friend Request accepted successfully", friendRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a friend request
module.exports.addFriendRequest = async (req, res) => {
    const { userId, friendUsername } = req.body;
    try {
        // Ensure that friendUsername are provided in the request body
        if (!friendUsername) {
            return res.status(400).json({ message: "No username provided" });
        }

        const friendUser = await User.findOne({ username: friendUsername });
        if (!friendUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const existingFriendRequest = await FriendRequest.findOne({ userId, friendUsername });
        if (existingFriendRequest) {
            return res.status(400).json({ message: "Friend Request already exists" });
        }

        const existingFriendship = await Friendship.findOne({ userId, friendUsername });
        if (existingFriendship) {
            return res.status(400).json({ message: "Friendship already exists" });
        }

        const user = await User.findOne({ _id: userId })
        await FriendRequest.create({ userId: friendUser._id, friendUsername: user.username, status: 'Received'})
        const friendRequest = await FriendRequest.create({ userId, friendUsername, status: 'Sent' });
        res.status(201).json({ message: "Friend Request created successfully", friendRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a friend request
module.exports.deleteFriendRequest = async (req, res) => {
    const friendRequestId = req.body.friendRequestId;
    try {
        const friendRequest = await FriendRequest.findOneAndRemove({_id: friendRequestId});
        if (!friendRequest) {
            return res.status(400).json({ message: "Friend Request does not exist" });
        }
        const friendUser = await User.findOne({ username: friendRequest.friendUsername });
        const user = await User.findOne({ _id: friendRequest.userId })
        const deleteFriendRequest = await FriendRequest.findOneAndDelete({userId: friendUser._id, friendUsername: user.username})
        
        res.status(200).json({ message: "Friend Request deleted successfully", friendRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}