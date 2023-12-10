import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post(
                "https://anti-scatter-36f9c5f65c17.herokuapp.com/login",
                {
                ...inputValue,
                }
            );

            const { success, token } = data;
            
            if (success) {
                localStorage.setItem("token", token);
                setTimeout(() => {
                navigate("/");
                window.location.reload();
                }, 1000);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
        ...inputValue,
        email: "",
        password: "",
        });
    };

    return (
        <Row className ="mb-3" >
            <div className="form_container">
            <h2><Badge bg="warning">Login Account</Badge> </h2>
            <form onSubmit={handleSubmit}>
                <Col id = "loginColumn"> 
                    <label id = "loginlabel" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </Col>
                <Col id = "loginColumn" > 
                    <label id = "loginlabel" htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </Col> 
                <Col id = "loginColumn"> 
                    <button type="submit">Submit</button>
                </Col>
                <Col id= "loginColumn"> 
                    <span>
                    Don't have an account? <Link to={"/signup"}>Signup</Link>
                    </span>
                </Col>
            </form>
            </div>
        </Row>
    );

};

export default Login;