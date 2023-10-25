import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login, Signup, DashboardHome} from "./pages";
import Home from "./pages/Home";


// This app is the main component of the application. It is responsible for rendering the routes of the application.
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="dashboardhome" element={<DashboardHome />} /> 
      </Routes>
    </div>
  );
}

export default App;
