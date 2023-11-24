import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
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

    const handleError = (err) =>
        toast.error(err, {
        position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.post(
            "https://anti-scatter-36f9c5f65c17.herokuapp.com/login",
            {
            ...inputValue,
            },
            { withCredentials: true }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
            navigate("/");
            }, 1000);
        } else {
            handleError(message);
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
        <Form> 
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
        <ToastContainer />
        </div>
        </Row>
        </Form> 
    );

};

export default Login;