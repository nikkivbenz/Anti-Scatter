import './App.css';
import './Website.css';


import {Route, Routes} from 'react-router-dom';
import {Login, Signup, TodoList} from "./pages";
import Home from "./pages/Home";

import Header from './pages/Header';
import NavigationBar from './pages/NavigationBar';
import Dashboard from './pages/Dashboard';
import Blocklist from './pages/Blocklist';
import Allowlist from './pages/Allowlist';
import BlockByTheme from './pages/BlockByTheme';
import Social from './pages/Social';
import ToDoList from './pages/ToDoList';
import Settings from './pages/Settings';
import Feedback from "./pages/Feedback";
import FAQ from './pages/FAQ';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blocklist" element={<Blocklist/>} />
          <Route path="/allowlist" element={<Allowlist/>} />
          <Route path="/blockbytheme" element={<BlockByTheme />} />
          <Route path="/social" element={<Social />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/FAQ" element={<FAQ/>} /> 
          <Route path="/feedback" element={<Feedback/>} /> 
        </Routes>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
