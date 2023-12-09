import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        email: "",
        password: "",
    });
    
    const {email, password, username} = inputValue;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.post(
            "https://anti-scatter-36f9c5f65c17.herokuapp.com/signup",
            {
            ...inputValue,
            },
            { withCredentials: true }
        );
        const { success, token } = data;

        if (success) {
            localStorage.setItem("token", token);
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 1000);
        } 

        } catch (error) {
        console.log(error);
        }

        setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
        });
    };

    return (
        <div className="form_container">
            <h2>Signup Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                />
                </div>
                    <button type="submit">Submit</button>
                <div>
                    <span>
                    Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signup;
