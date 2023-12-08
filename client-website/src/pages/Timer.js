//in session page displays timer and todo list atm 

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ToDoList from './ToDoList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Timer({ hours, minutes }) {
  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const formatTime = () => {
    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    return `${hrs}:${mins}:${secs}`;
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
