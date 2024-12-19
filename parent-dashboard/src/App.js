import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Overview from './pages/Overview';
import Journey from './pages/Journey';
import Achievements from './pages/Achievements'; 
import Syllabus from './pages/Syllabus';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import './styling/App.css';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/overview') {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href);
      };
    }
  }, [location]);

  return (
    <div className="main-content">
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/achievements" element={<Achievements />} /> {/* New Route */}
        <Route path="/journey" element={<Journey />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/syllabus" element={<Syllabus />} />
      </Routes>
    </div>
  );
};

export default App;
