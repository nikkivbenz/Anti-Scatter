import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*
    This is the home page of the application. It is a protected route, which means that the user can only access it if he/she is logged in.
*/

const Home = () => {
    const navigate = useNavigate(); // React Router's hook for programmatic navigation
    const [username, setUsername] = useState(""); // React state for storing the username

    useEffect(() => {
    // This is a React useEffect hook. It is used for side effects in your component.
    // It runs when the component mounts (due to the empty dependency array).

        const verifyCookie = async () => {
            // This is an asynchronous function for verifying user authentication.
            try {
                const storedToken = localStorage.getItem("token");
                if (!storedToken) {
                    // If the 'token' cookie is not present (user is not authenticated):
                    navigate("/login");
                    // Navigate to the "/login" route. 'navigate' is used to change the route.
                }
        
                const { data } = await axios.post(
                    "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                    {token: storedToken}
                );
        
                const { status, user } = data;
                setUsername(user.username);
                // Set the 'username' state with the user's name from the response.
        
                return status
                    ? true
                    : (localStorage.removeItem("token"), navigate("/login"));
                // If the authentication is successful (status is true), show a toast notification.
                // If not, remove the 'token' cookie, and navigate to the "/login" route.
            } catch (error) {
                console.log("Error verifying cookie:", error);
                navigate("/login");
            }
        };

        verifyCookie();
        // Execute the 'verifyCookie' function when the component mounts.

    }, [navigate]);
    // The useEffect depends on 'cookies', 'navigate', and 'removeCookie'.
    // It will re-run whenever any of these dependencies change.

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();
    };
    
    const Dashboard = () => {
        navigate("/dashboard"); 
    }; 
    return (
        <>
        <div className="home_page">
            <h4>
            {" "}
            Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>LOGOUT</button>
            <button onClick={Dashboard}>GO TO DASHBOARD</button>
        </div>
        </>
    );
};

export default Home;