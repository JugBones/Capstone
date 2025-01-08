import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { auth } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styling/Profile.css";

const Profile = () => {
  const [user] = useAuthState(auth); 
  const userName = user?.email ? user.email.split('@')[0] : user?.displayName || 'User';
  const [classData, setClassData] = useState(null);
  const navigate = useNavigate(); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || "/avatar.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Fetch updated profile picture from the backend
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${user.uid}/profile_picture`
        );
        setProfilePicture(response.data.profile_picture_url || "/avatar.jpg");
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    if (user) fetchProfilePicture();
  }, [user]);


  useEffect(() => {
    const fetchClassData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8000/users/${user.uid}`);
          const classResponse = await axios.get(`http://localhost:8000/classes/${response.data.class_id}`);
          setClassData(classResponse.data);
        } catch (err) {
          console.error('Error fetching class data:', err);
          setClassData({ name: 'Class not found', level: '' });
        }
      }
    };
    fetchClassData();
  }, [user]);

  // Logout functionality
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate("/login"); 
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  // Handle Materi click to redirect to the syllabus page
  const handleMateriClick = () => {
    navigate("/syllabus");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle Profile Picture Upload
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:8000/users/${user.uid}/profile_picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePicture(response.data.image_url); // Update profile picture URL
      alert("Profile picture updated successfully!");
      setIsModalOpen(false); // Close the modal after successful upload
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={profilePicture}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <div className="profile-header-row">
            <h2>
              {userName}
              <span
                className="edit-icon"
                onClick={() => setIsModalOpen(true)}
              >
                ✏️
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Modal for Upload */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Upload Profile Picture</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="modal-buttons">
              <button onClick={handleUpload}>Submit</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Stats */}
      <div className="profile-stats">
        <div className="user-class">
          {classData ? `${classData.name} - ${classData.level}` : 'Loading class...'}
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
        <div className="preference-item" onClick={handleMateriClick}>
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
