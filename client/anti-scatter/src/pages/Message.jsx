import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Message = () => {
    const [data, setData] = useState();

    useEffect(() => {
        // Define the URL of the backend endpoint
        const backendUrl = 'http://localhost:4000/message';
    
        // Make a GET request to the backend using fetch
        fetch(backendUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
            })
            .then((responseData) => {
            // Handle the response data
            setData(responseData);
            console.log(responseData);
            })
            .catch((error) => {
            // Handle errors
            console.error('Error:', error);
        });
    }, []);

    return (
        <div>
            <h1>Message</h1>
            <p>{data}</p>
        </div>
    );
};

export default Message;