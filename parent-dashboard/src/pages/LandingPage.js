import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Please choose an option:</p>
      <Link to="/signup"><button>Sign Up</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
};

export default LandingPage;
