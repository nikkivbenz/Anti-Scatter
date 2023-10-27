import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

/*
    This is the home page of the application. It is a protected route, which means that the user can only access it if he/she is logged in.
*/

const Home = () => {
        const navigate = useNavigate(); // React Router's hook for programmatic navigation
    const [cookies, removeCookie] = useCookies([]); // React Cookies hook for managing cookies
    const [username, setUsername] = useState(""); // React state for storing the username

    useEffect(() => {
    // This is a React useEffect hook. It is used for side effects in your component.
    // It runs when the component mounts (due to the empty dependency array).

    const verifyCookie = async () => {
        // This is an asynchronous function for verifying user authentication.

        if (!cookies.token) {
            // If the 'token' cookie is not present (user is not authenticated):
            navigate("/login");
            // Navigate to the "/login" route. 'navigate' is used to change the route.
        }
        
        // The following code is not reached if the 'token' cookie is missing:
        const { data } = await axios.post(
            "http://localhost:4000",
            {},
            { withCredentials: true }
        );
        // This sends a POST request to your backend, likely for authentication.
        // 'withCredentials: true' sends cookies with the request for session maintenance.
        const { status, user } = data;
        setUsername(user);
        // Set the 'username' state with the user's name from the response.

        return status
            ? toast(`Hello ${user}`, {
                position: "top-right",
            })
            : (removeCookie("token"), navigate("/login"));
        // If the authentication is successful (status is true), show a toast notification.
        // If not, remove the 'token' cookie, and navigate to the "/login" route.
        
    };

    verifyCookie();
    // Execute the 'verifyCookie' function when the component mounts.

    }, [cookies, navigate, removeCookie]);
    // The useEffect depends on 'cookies', 'navigate', and 'removeCookie'.
    // It will re-run whenever any of these dependencies change.

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };
    const StudySchedule = () => {
        navigate("/studyschedule");
    };
    return (
        <>
        <div className="home_page">
            <h4>
            {" "}
            Welcome <span>{username}</span>
            </h4>
            <button onClick={StudySchedule}>SCHEDULE</button>
            <button onClick={Logout}>LOGOUT</button>
        </div>
        <ToastContainer />
        </>
    );
};

export default Home;