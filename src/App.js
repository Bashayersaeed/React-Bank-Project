import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Transactions from './Components/Transactions';

function App() {


  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Transactions">Transactions</Link>
        <Link to="/users">Users</Link>
        <Link to="/profile">Profile</Link>
      </nav>
  <div>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    </div>
  
  );
}

export default App;
