import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Overview from './pages/Overview';
import Journey from './pages/Journey';
import Achievements from './pages/Achievements';
import Syllabus from './pages/Syllabus';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import PictureInPicture from './pages/PictureinPicture'; // Import the new PictureInPicture page
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import './styling/App.css';

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
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/picture-in-picture" element={<PictureInPicture />} /> {/* New Route */}
      </Routes>
    </div>
  );
};

export default App;
