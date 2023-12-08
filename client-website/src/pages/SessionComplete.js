import React from 'react';
import { Button, Jumbotron, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SessionComplete() {
  let navigate = useNavigate();

  const continueSession = () => {
    // Navigate back to the StartSession page
    navigate('/startsession');
  };

  return (
    <Container className="mt-5">
      <Jumbotron className="text-center bg-transparent">
        <h1 className="display-3">Congratulations!</h1>
        <p className="lead">You've completed your session!</p>
        <hr className="my-4" />
        <p>Take a well-deserved break, or set up your next session.</p>
        <p className="lead">
          <Button variant="primary" size="lg" onClick={continueSession}>
            Continue
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
}

export default SessionComplete;
