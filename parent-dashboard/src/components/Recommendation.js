import React, { useEffect, useState } from 'react';
import '../styling/Recommendation.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

// Importing the images
import MathImage from '../assets/MathImage.png';
import PhysicsImage from '../assets/PhysicsImage.png';

const Recommendation = ({ user, selectedCourse }) => {
  const [recommendations, setRecommendations] = useState([]);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recommendations/${user.uid}`
        );
        const recommendationData = response.data.recommendations;

        const courseKey = selectedCourse.toLowerCase(); // Ensure the course name matches the keys in the API response (e.g., "matematika" or "fisika").
        setRecommendations(recommendationData[courseKey] || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    if (user?.uid && selectedCourse) {
      fetchRecommendations();
    }
  }, [user, selectedCourse]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Determine the default image based on the course
  const defaultImage = selectedCourse === 'Matematika' ? MathImage : PhysicsImage;

  return (
    <div className="recommendation-container">
      <h3 className="recommendation-title">🤝 Rekomendasi Bacaan untuk {selectedCourse}</h3>
      <div className="recommendation-slider-wrapper">
        <button className="arrow-button left-arrow" onClick={() => scroll('left')}>
          <ArrowBackIosIcon />
        </button>
        <div className="recommendation-slider" ref={sliderRef}>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <a href={rec.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={rec.image || defaultImage} // Use recommendation's image if available, else use default
                    alt={rec.title}
                    className="recommendation-image"
                  />
                </a>
                <div className="recommendation-content">
                  <h4 className="recommendation-card-title">{rec.title}</h4>
                  <p className="recommendation-card-details">{rec.details}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-recommendations">Tidak ada rekomendasi untuk {selectedCourse}.</p>
          )}
        </div>
        <button className="arrow-button right-arrow" onClick={() => scroll('right')}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
