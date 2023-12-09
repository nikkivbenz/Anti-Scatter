import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Blocklist(){
    const [userId, setUserId] = useState('');
    const [blocklist, setBlocklist] = useState([]);
    const [newWebsite, setNewWebsite] = useState('');
    const navigate = useNavigate();

    const getBlockList = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `https://anti-scatter-36f9c5f65c17.herokuapp.com/blocklist/${userId}`
            );

            setBlocklist(Object.values(data.blockWebsites));
            // Set the 'blocklist' state with the user's blocklist from the response.
            console.log(data);
        } catch (error) {
            console.log("Error getting blocklist:", error);
        }
    }, [userId]);

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
        getBlockList();
    }, [userId, getBlockList, navigate]);

    const handleDelete = async (website) => {
        try {
            getBlockList();

            const { data } = await axios.put(
                "https://anti-scatter-36f9c5f65c17.herokuapp.com/blocklist",
                {
                    userId,
                    blockWebsites: blocklist.filter((item) => item !== website)
                }
            );

            console.log(data);

            setBlocklist(Object.values(data.blockWebsites));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddWebsite = async () => {
        try {
            if (blocklist.length > 0) {
                blocklist.push(newWebsite)

                const { data } = await axios.put("https://anti-scatter-36f9c5f65c17.herokuapp.com/blocklist",
                    {
                        userId,
                        blockWebsites: blocklist
                    }
                );

                console.log(data);

                setBlocklist(Object.values(data.blockWebsites));
                setNewWebsite('');
            } else {
                blocklist.push(newWebsite)

                const { data } = await axios.post(
                    "https://anti-scatter-36f9c5f65c17.herokuapp.com/blocklist",
                    {
                        userId,
                        blockWebsites: blocklist
                    }
                );

                console.log(data);

                setBlocklist(Object.values(data.blockWebsites));
                setNewWebsite('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
            <div>
                <h1>Blocklist</h1>
                <div>
                    <label>
                    Add Website:
                    <input
                        type="text"
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    </label>
                    <button onClick={handleAddWebsite}>Add</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Website</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blocklist.map((website, index) => (
                        <tr key={index}>
                        <td>{website}</td>
                        <td>
                            <button onClick={() => handleDelete(website)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    ); 
}

export default Blocklist; 