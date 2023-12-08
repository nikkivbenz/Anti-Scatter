//in session page displays timer and todo list atm 

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ToDoList from './ToDoList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useNavigate, useLocation } from 'react-router-dom';


function Timer() {

  const location = useLocation();
  const { hours, minutes } = location.state || {}; // Provide a default object in case state is undefined


  console.log('Received Hours:', hours, 'Received Minutes:', minutes);
  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);
  let navigate = useNavigate();

  const endSession = () => {

    navigate('/SessionComplete');
  }


  const formatTime = () => {
    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <Container> 
        <Row> 
            <Col> 
            <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '18rem', margin: 'auto', marginTop: '20px' }}>
            <Card.Body>
                <Card.Title>Timer Countdown</Card.Title>
                <Card.Text>
                {formatTime()}
                </Card.Text>
            </Card.Body>
            </Card>
        </Col> 
        <Col className="d-flex justify-content-center align-items-center"> 
                {/* Add the button here */}
                <Button variant="danger" onClick={endSession}>End Session</Button>
            </Col> 
    </Row> 

    <ToDoList /> 
    </Container>
  );

}

export default Timer;
