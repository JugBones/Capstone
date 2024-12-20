import React, { useRef, useEffect, useState } from 'react';
import '../styling/Recommendation.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const Recommendation = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recommendations/${user.uid}`
        );
        const recommendationData = response.data.recommendations.map((item) => ({
          title: item.title,
          details: item.snippet,
          link: item.link,
          image: `https://via.placeholder.com/150/${Math.floor(Math.random() * 16777215).toString(16)}`,
        }));
        setRecommendations(recommendationData);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    if (user?.uid) {
      fetchRecommendations();
    }
  }, [user]);

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

  return (
    <div className="recommendation-container">
      <h3 className="recommendation-title">🤝 Rekomendasi Bacaan</h3>
      <div className="recommendation-slider-wrapper">
        <button className="arrow-button left-arrow" onClick={() => scroll('left')}>
          <ArrowBackIosIcon />
        </button>
        <div className="recommendation-slider" ref={sliderRef}>
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <a href={rec.link} target="_blank" rel="noopener noreferrer">
                <img src={rec.image} alt={rec.title} className="recommendation-image" />
              </a>
              <div className="recommendation-content">
                <h4 className="recommendation-card-title">{rec.title}</h4>
                <p className="recommendation-card-details">{rec.details}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-button right-arrow" onClick={() => scroll('right')}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
