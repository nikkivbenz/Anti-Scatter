import React, { useState, useEffect } from 'react';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';


function StartSession() {
    // const [data, setData] = useState([]);
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

                navigate('/startsession')
            } catch (error) {
                console.error("Error verifying cookie:", error);
                navigate("/login");
            }
        };

        verifyCookie();
    }, [navigate]);


    const handleConfirm = () => {
    // Close the modal
    handleClose();

    // Navigate to Timer page

    console.log('Hours:', hours, 'Minutes:', minutes);

    // Add this in Timer at the beginning of the component

    navigate('/Timer', { state: { hours: hours.toString(), minutes: minutes.toString() } });
    };

  const [minutes, setMinutes] = useState('00');
  const [hours, setHours] = useState('00');

  const userID = "test1"; 

  const onMinutesChange = (e) => setMinutes(e.target.value);
  const onHoursChange = (e) => setHours(e.target.value);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState('');

  const handleClick = (buttonName) => {
    setActive(buttonName);
    // Send data to Flask server
    sendDataToServer(minutes, hours, buttonName);
  };

  const sendDataToServer = async (minutes, hours, blockingMethod) => {
    // Convert hours and minutes to numbers to ensure they are not strings
    const numHours = parseInt(hours, 10);
    const numMinutes = parseInt(minutes, 10);
  
    // You may want to check if the conversion is successful
    if (isNaN(numHours) || isNaN(numMinutes)) {
      console.error('Invalid input for hours or minutes');
      return;
    }
  
    try {
      const response = await axios.post("/api/start-session", {
        minutes: numMinutes,
        hours: numHours,
        blockingMethod,
        userID
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <Container> 
            <Container className="timer-layout">
        <Row id = 'session-rows' className="justify-content-center">
            <Col className="text-center">
            <h2 className="timer-title"> Set Study Session Duration </h2>
            </Col>
        </Row>
        <Row  id = 'session-rows' className="justify-content-center timer-display">
            <Col xs={4} className="text-center timer-segment">
            <Form.Control
                type="number"
                className="timer-input"
                value={hours}
                onChange={onHoursChange}
            />
            <div className="timer-label">Hours</div>
            </Col>
            <Col xs={4} className="text-center timer-segment">
            <Form.Control
                type="number"
                className="timer-input"
                value={minutes}
                onChange={onMinutesChange}
            />
            <div className="timer-label">Minutes</div>
            </Col>
        </Row>
        </Container>
    <Container> 
        <Row  id = 'session-rows'> 
            <Card className="text-center">
            <Card.Header>Choose Your Blocking Method.</Card.Header>
            <Card.Body>
                <Card.Text>
            <ButtonGroup>
                <Button id='toogle-buttons'
                variant={active === 'blocklist' ? 'success' : 'danger'}
                onClick={() => handleClick('blocklist')}
                >
                Blocklist
                </Button>{' '}

                <Button  id='toggle-buttons'
                variant={active === 'blockByTheme' ? 'success' : 'danger'}
                onClick={() => handleClick('blockByTheme')}
                >
                Block By Theme
                </Button>
            </ButtonGroup>            
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"> Can edit each of these features in their respective menu items.</Card.Footer>
            </Card>
        </Row> 

    </Container> 
{/* 
    <Container>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th colSpan={2} >Friends!</th>
            <th colSpan={1} >Username</th>
            <th>Invite? </th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td> THTDAWG123</td>
            <td><Button variant="warning"> Invite? :)  </Button>{' '}</td>
            </tr>

            <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td> THTDAWG123</td>
            <td><Button variant="warning"> Invite?  :)  </Button>{' '}</td>
            </tr>

            <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td> THTDAWG123</td>
            <td><Button variant="warning"> Invite? :)  </Button>{' '}</td>
            </tr>

            <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td> THTDAWG123</td>
            <td><Button variant="warning"> Invite?  :)  </Button>{' '}</td>
            </tr>

            <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td> THTDAWG123</td>
            <td><Button variant="warning"> Invite?  :)  </Button>{' '}</td>
            </tr>
        </tbody>
        </Table>
    </Container> */}
    <Container > 
        <Row> 
            <Col className= "d-flex justify-content-center align-items-center"> 
            <Button
                variant="primary"
                onClick={() => {
                    handleShow();
                    sendDataToServer(minutes, hours, active);
                }}
                >
                Start Session
            </Button>
        </Col>
        </Row> 

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Study session Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p><strong>Time:</strong> {hours} hours and {minutes} minutes</p>
                <p><strong>Blocking Method:</strong> {active === 'blocklist' ? 'Blocklist' : active === 'blockByTheme' ? 'Block By Theme' : 'None'}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    </Container>
    </Container>
  );
}

export default StartSession;


