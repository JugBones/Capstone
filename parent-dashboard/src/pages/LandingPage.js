import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styling/LandingPage.css';
import coLearnLogo from '../assets/colearn.png';

const LandingPage = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const messages = ["Join us in supporting your childern's learning journey."];
  
  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[loopNum % messages.length];
      const isComplete = !isDeleting && text === currentMessage;
      
      // Handle typing
      if (!isDeleting && text !== currentMessage) {
        setText(currentMessage.substring(0, text.length + 1));
        setTypingSpeed(100);
      }
      // Handle backspacing
      else if (isDeleting && text !== '') {
        setText(currentMessage.substring(0, text.length - 1));
        setTypingSpeed(50);
      }
      // Start backspacing once the message is fully typed
      else if (!isDeleting && isComplete) {
        setIsDeleting(true);
        setTypingSpeed(100);
      }
      // Switch to typing once fully deleted
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, typingSpeed, loopNum, messages]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <img src={coLearnLogo} alt="CoLearn Logo" className="logo" />
        <h2>Welcome to CoLearn</h2>
        <p className="typewriter">{text}</p>
        <div className="button-container">
          <Link to="/signup"><button className="primary-btn">SignUp</button></Link>
          <Link to="/login"><button className="secondary-btn">Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
