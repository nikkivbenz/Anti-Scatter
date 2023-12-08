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
            <Nav.Link as={Link} to="/Allowlist" className="nav-link">
              Allowlist
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

        <Navbar className="bg-body-tertiary">
          <Container>
            <Nav.Link
              as={Link}
              to="https://chromewebstore.google.com/detail/quick-website-blocker/dlkgngbfjjcgblhbbpaicodbaihdkbdi?utm_source=app-launcher"
              className="nav-link"
            >
              Extension
            </Nav.Link>
          </Container>
        </Navbar>
      </div>
      {/* <Navbar className="navbar navbar-expand-lg  sidebar" id="sideNav" >
        <Container>
        <Nav className="me-auto">

          <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/StartSession">Start A Session!</Nav.Link>
          <Nav.Link as={Link} to="/Blocklist">Blocklist</Nav.Link>
          <Nav.Link as={Link} to="/Allowlist">Allowlist</Nav.Link>
          <Nav.Link as={Link} to="/BlockByTheme">Block By Theme</Nav.Link>
          <Nav.Link as={Link} to="/Social">Social</Nav.Link>
          <Nav.Link as={Link} to="/TodoList">To-do List</Nav.Link>
          <Nav.Link as={Link} to="/Settings">Setting</Nav.Link>
          <Nav.Link as={Link} to="/FAQ">FAQ</Nav.Link>
          <Nav.Link as={Link} to="/Feedback">Give Us Feedback!</Nav.Link>
          </Nav>
          
        </Container>
      </Navbar> */}
    </>
  );
}
