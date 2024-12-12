import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Overview from './pages/Overview';
import Journey from './pages/Journey';
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
          {/* Landing page for signup or login options */}
          <Route path="/" element={<LandingPage />} />

          {/* Public routes for login and signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protect the sidebar, header, and routes for authenticated users */}
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
  // const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/overview') {
      // Push /overview onto the history stack, disabling the back button
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        // Prevent going back and force the user to stay on /overview
        window.history.pushState(null, '', window.location.href);
      };
    }
  }, [location]);

  return (
    <div className="main-content">
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
