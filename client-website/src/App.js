import './App.css';
import './Website.css';


import { Route, Routes } from 'react-router-dom';
import { Login, Signup, Home } from "./pages";
import { Header, NavigationBar, Dashboard, Feedback, FAQ , Settings, StartSession, ToDoList, Blocklist, BlockSchedule, Social, Calendar, Timer, SessionComplete} from "./pages";

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
              <Route path="/settings" element={<Settings/>} /> 
              <Route path ="/blocklist" element={<Blocklist/>} />
              <Route path ="/startsession" element={<StartSession/>} />
              <Route path ="/todolist" element={<ToDoList/>} />
              <Route path ="/social" element={<Social/>} />
              <Route path="/Calendar" element={<Calendar/>} /> 
              <Route path="/Timer" element={<Timer />} />
              <Route path="/SessionComplete" element={<SessionComplete />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
