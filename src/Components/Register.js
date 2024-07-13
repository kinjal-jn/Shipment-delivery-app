import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Missing credentials');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('Email already in use');
            break;
          case 'auth/invalid-email':
            setError('Invalid email');
            break;
          case 'auth/weak-password':
            setError('Password should be at least 6 characters');
            break;
          default:
            setError(error.message);
            break;
        }
      });
  };

  return (
    <div className="register-container">
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
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>Made by Kinjal Jain | Email: kinjaljn2811@gmail.com</p>
      </footer>
    </div>
  );
}

export default Register;
