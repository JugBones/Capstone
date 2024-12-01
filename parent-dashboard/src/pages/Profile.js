import React from "react";
import { useAuthState } from "react-firebase-hooks/auth"; // Firebase hook
import { auth } from "../firebase"; // Firebase auth instance
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../styling/Profile.css";

const Profile = () => {
  const [user] = useAuthState(auth); // Get the logged-in user
  const navigate = useNavigate(); // For navigation

  // Logout functionality
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate("/login"); // Redirect to the login page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={user?.photoURL || "/avatar.jpg"}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <h2>{user?.displayName || "User"}</h2>
          <p className="profile-role">Newbie</p>
          <button className="edit-profile-button">✏️</button>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        <div className="badge">
          <p>Bronze</p>
        </div>
        <div className="stat">
          <h3>20</h3>
          <p>Badge</p>
        </div>
        <div className="stat">
          <h3>2</h3>
          <p>Course</p>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="preferences-section">
        <h3>Pengaturan dan Preferensi</h3>
        <div className="preference-item">
          <span role="img" aria-label="Materi">
            🏆
          </span>
          <p>Materi</p>
        </div>
        <div className="preference-item">
          <span role="img" aria-label="Settings">
            ⚙️
          </span>
          <p>Settings</p>
        </div>
        <div className="preference-item">
          <span role="img" aria-label="Privacy">
            🔒
          </span>
          <p>Privacy</p>
        </div>
      </div>

      {/* Account Section */}
      <div className="account-section">
        <h3>Akun</h3>
        <p className="switch-account">Switch to Another Account</p>
        <p className="logout-account" onClick={handleLogout}>
          Logout Account
        </p>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
