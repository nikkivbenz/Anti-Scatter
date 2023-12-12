import * as React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationBar() {
  return (
    <>
      <div className="nav-container">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Dashboard" className="nav-link">
              Dashboard
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/StartSession" className="nav-link">
              Start A Session!
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Blocklist" className="nav-link">
              Blocklist
            </Nav.Link>
          </Container>
        </Navbar>

      
        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/BlockByTheme" className="nav-link">
              Block By Theme
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Blockschedule" className="nav-link">
              Block By Schedule
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Calendar" className="nav-link">
              Calendar
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Social" className="nav-link">
              Social
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/TodoList" className="nav-link">
              To-do List
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Settings" className="nav-link">
              Setting
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/FAQ" className="nav-link">
              FAQ
            </Nav.Link>
          </Container>
        </Navbar>

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link as={Link} to="/Feedback" className="nav-link">
              Give Us Feedback!
            </Nav.Link>
          </Container>
        </Navbar>

      <Navbar className="bg-body-tertiary" >
        <Container>
        <Nav.Link as={Link} to="/ReleaseNotes" className="nav-link">Release Notes</Nav.Link>
        </Container>
      </Navbar>
      </div>  
     
    </>
  );
}
