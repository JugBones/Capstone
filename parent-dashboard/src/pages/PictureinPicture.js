import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styling/PictureInPicture.css';
import CoLearnLogo from '../assets/colearn-white.png'; // Import CoLearn logo

const PictureInPicture = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the link from the state
  const targetUrl = location.state?.link;

  return (
    <div className="picture-in-picture-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Kembali
        </button>
        <img src={CoLearnLogo} alt="CoLearn Logo" className="header-logo" />
      </div>
      <div className="iframe-wrapper">
        {targetUrl ? (
          <iframe
            src={`http://localhost:8000/proxy?url=${encodeURIComponent(targetUrl)}`}
            title="Website Preview"
            className="website-preview-iframe"
          ></iframe>
        ) : (
          <p className="no-url">No URL provided</p>
        )}
      </div>
    </div>
  );
};

export default PictureInPicture;
