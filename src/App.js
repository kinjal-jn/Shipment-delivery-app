// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Razorpay from './Components/Razorpay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/razorpay" element={<Razorpay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
