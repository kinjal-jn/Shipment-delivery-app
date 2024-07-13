import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="top-header">
        <h2>Shippeddd</h2>
      </div>
      <header className="header">
        <h1>"Welcome to a world of fast and secure deliveries"</h1>
      </header>
      <div className="content-container">
        <div className="image-container">
          <img src="/landing.jpg" alt="Landing" />
        </div>
        <div className="button-container">
        <p>Already an User??</p>
          <Link to="/login" className="btn">Login</Link>
          <p>NEW User??</p>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>
      <footer className="footer">
        <p>Made by Kinjal Jain | Email: kinjaljn2811@gmail.com</p>
      </footer>
    </div>
  );
}

export default LandingPage;
