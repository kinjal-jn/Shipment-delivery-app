import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Missing credentials');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setError('Not a valid user');
            break;
          case 'auth/wrong-password':
            setError('Invalid credentials');
            break;
          default:
            setError(error.message);
            break;
        }
      });
  };

  return (
    <div className="login-container">
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
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
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

export default Login;
