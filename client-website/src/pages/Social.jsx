import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Social() {
    const navigate = useNavigate(); // React Router's hook for programmatic navigation
    const [friends, setFriends] = useState([]); // React state for storing friends
    const [friendRequests, setFriendRequests] = useState([]); // React state for storing friend requests
    const [sentRequests, setSentRequests] = useState([]);
    const [showSentRequests, setShowSentRequests] = useState(false);
    const [showFriendRequests, setShowFriendRequests] = useState(false); // React state for toggling friend requests
    const [userId, setUserId] = useState(""); // React state for storing the username
    const [friendInput, setFriendInput] = useState("");

    const getFriends = async () => {
        try{
            // Fetch friends data from the backend
            var { data } = await axios.get(`https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/${userId}`);
            setFriends(Object.values(data.friendships));

            // Fetch friend requests data from the backend
            var { data } = await axios.get(`https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request/received/${userId}`);
            setFriendRequests(Object.values(data.friendRequests));
            
            var { data } = await axios.get(`https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request/sent/${userId}`);
            setSentRequests(Object.values(data.friendRequests));
        } catch (error) {
            console.log("Error getting data:", error);
        }
    };


    useEffect(() => {
        const verifyCookie = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (!storedToken) {
                    navigate("/login");
                    // Navigate to the "/login" route. 'navigate' is used to change the route.
                }
        
                const { data } = await axios.post(
                    "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                    {token: storedToken}
                );
        
                const { status, user } = data;
                setUserId(user._id);
                // Set the 'username' state with the user's name from the response.
        
                return status
                    ? console.log(`Verified ${user.username}!`)
                    : (localStorage.removeItem("token"), navigate("/login"));
                // If the authentication is successful (status is true), console.log().
                // If not, remove the 'token' cookie, and navigate to the "/login" route.
            } catch (error) {
                console.log("Error verifying cookie:", error);
                navigate("/login");
            }
        };

        verifyCookie();
        getFriends();
    }, [userId, navigate, getFriends]);

    const sendFriendRequest = async () => {
        try {
            const { data } = await axios.post(
                "https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request",
                { userId, friendUsername: friendInput }
            );

            console.log(data.message);

            setFriendInput("");
        } catch (error) {
            console.log("Error sending friend request:", error);
        }

        getFriends();
    };

    const deleteFriend = async (friendId) => {
        try {
            // Assuming you have an API endpoint to delete friends
            const { data } = await axios.delete(`https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/${friendId}`, {
                data: { friendshipId: friendId }
            });
        
            console.log(data.message);
        
            // Refresh the friends list after deleting a friend
            getFriends();
        } catch (error) {
            console.log("Error deleting friend:", error);
        }
    };

    const handleFriendRequest = async (requestId, accept) => {
        try {
            const endpoint = accept
                ? `https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request/accept/`
                : `https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request/reject/`;
        
            const { data } = await axios.put(endpoint, { friendRequestId: requestId });
        
            console.log(data.message);
        
            // Refresh the friend requests after accepting or rejecting a request
            getFriends();
            } catch (error) {
            console.log("Error handling friend request:", error);
        }
    };

    const handleCancelRequest = async (requestId) => {
        try {
            const endpoint = `https://anti-scatter-36f9c5f65c17.herokuapp.com/friends/request/`;
            const { data } = await axios.delete(endpoint, {data: { friendRequestId: requestId }});

            console.log(data.message);

            getFriends();
        } catch (error) {
            console.log("Error cancelling friend request:", error);
        }
    }; 

    // Function to calculate the duration between two dates
    const calculateDuration = (startDate) => {
        const start = new Date(startDate);
        const now = new Date();
        const diffInMilliseconds = now - start;

        const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diffInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

        return `${days} days, ${hours} hours`;
    };

    return (
        <div>
            <div>
                <label>
                    Add Friend by Username
                    <input
                        type="text"
                        value={friendInput}
                        onChange={(e) => setFriendInput(e.target.value)}
                    />
                </label> 
                <button onClick={sendFriendRequest}>Send Request</button>
            </div>

            <h1>Friends List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Friends For</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {friends.map((friend) => (
                        <tr key={friend._id}>
                            <td>{friend.friendUsername}</td>
                            <td>{calculateDuration(friend.acceptedAt)}</td>
                            <td>
                                <button onClick={() => deleteFriend(friend._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div>
                <button onClick={() => setShowFriendRequests(!showFriendRequests)}>
                {showFriendRequests ? 'Hide Friend Requests' : 'Show Friend Requests'}
                </button>
                {showFriendRequests && (
                <div>
                    <h2>Friend Requests</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Friend Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {friendRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.friendUsername}</td>
                                <td>
                                    <button onClick={() => handleFriendRequest(request._id, true)}>Accept</button>
                                    <button onClick={() => handleFriendRequest(request._id, false)}>Reject</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>

            <div>
                <button onClick={() => setShowSentRequests(!showSentRequests)}>
                    {showSentRequests ? 'Hide Sent Requests' : 'Show Sent Requests'}
                </button>
                {showSentRequests && (
                <div>
                    <h2>Sent Requests</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sentRequests.map((sentRequest) => (
                            <tr key={sentRequest._id}>
                                <td>{sentRequest.friendUsername}</td>
                                <td>
                                    <button onClick={() => handleCancelRequest(sentRequest._id)}>Cancel</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </div>
    );
}

export default Social;
