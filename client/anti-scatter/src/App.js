import './App.css';
import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login, Signup, Message} from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
