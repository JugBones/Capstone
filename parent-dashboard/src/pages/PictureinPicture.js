import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styling/PictureInPicture.css';
import CoLearnLogo from '../assets/colearn-white.png';

const PictureInPicture = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [markdownContent, setMarkdownContent] = useState('');
  const [error, setError] = useState(null);

  // Retrieve the downloadUrl from the state
  const targetUrl = location.state?.link;

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!targetUrl) {
        setError('No URL provided');
        return;
      }

      try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown content: ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMarkdown();
  }, [targetUrl]);

  return (
    <div className="picture-in-picture-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Kembali
        </button>
        <img src={CoLearnLogo} alt="CoLearn Logo" className="header-logo" />
      </div>
      <div className="markdown-wrapper">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="article-container">
            <ReactMarkdown
              className="markdown-content"
              children={markdownContent}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureInPicture;
