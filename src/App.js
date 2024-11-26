import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
