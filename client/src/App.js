import './App.css';
import './Website.css';


import { Route, Routes } from 'react-router-dom';
import { BlockSchedule, Login, Signup, Home } from "./pages";
import { Header, NavigationBar, Dashboard, Feedback, FAQ } from "./pages";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// This app is the main component of the application. It is responsible for rendering the routes of the application.
function App() {
  return (
    
    <div className="App">
      <Container>
        <Header/> 
        <Row>
          <Col sm={3}>
            <NavigationBar /> 
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blockschedule" element={<BlockSchedule />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback/>} /> 
              <Route path="/FAQ" element={<FAQ/>} /> 
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
