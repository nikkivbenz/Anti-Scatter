//Written by Katherine Hernandez
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Feedback = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
      const verifyCookie = async () => {
          try {
              const storedToken = localStorage.getItem("token");
              if (!storedToken) {
                  navigate("/login");
                  return;
              }

              const { data } = await axios.post(
                  "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                  { token: storedToken }
              );

              if (!data.status) {
                  localStorage.removeItem("token");
                  navigate("/login");
              }

              navigate('/feedback')
          } catch (error) {
              console.error("Error verifying cookie:", error);
              navigate("/login");
          }
      };

      verifyCookie();
  }, [navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Modify your handleSubmit function
const handleSubmit = async (event) => {
    try {
      const response = await axios.post('http://nkbenz.pythonanywhere.com/api/submit_feedback', {
        name,
        email,
        message
      });
      // Handle the response from the server here
      if (response.status === 200){
        alert('Feedback submitted. Thank you!');
      }

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Handle errors here, e.g., network error, server error, etc.
      console.error('There was an error submitting the feedback:', error);
    }
  };

  return (
    <div id="content"> 
    <Container >
      <Row>
        <Col id="feedbackform" >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feedbackForm.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="feedbackForm.Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="feedbackForm.Message">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter your feedback" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

    </div> 
  );
};

export default Feedback;
