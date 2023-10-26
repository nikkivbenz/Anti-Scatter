import React from 'react';
import LanguageSelector from './components/LanguageSelector';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login, Signup} from "./pages";
import Home from "./pages/Home";

// This app is the main component of the application. It is responsible for rendering the routes of the application.
function App() {
  return (
    <div className="App">
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
