import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styling/Login.css';
import coLearnLogo from '../assets/colearn.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/overview');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={coLearnLogo} alt="CoLearn Logo" className="logo" />
        <h3>Welcome back, Parents!</h3>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
          <button type="submit" className="primary-btn">Login</button>
        </form>
        <p>Don't have an account? <button onClick={handleSignupRedirect} className="link-btn">Sign up here</button></p>
      </div>
    </div>
  );
};

export default Login;