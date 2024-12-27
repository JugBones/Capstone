import React, { useRef, useEffect, useState } from 'react';
import '../styling/Recommendation.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const Recommendation = ({ user }) => {
  const [recommendations, setRecommendations] = useState({ matematika: [], fisika: [] });
  const sliderRefs = {
    matematika: useRef(null),
    fisika: useRef(null),
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recommendations/${user.uid}`
        );
        const { recommendations: recommendationData } = response.data;

        const formatData = (data) =>
          data.map((item) => ({
            title: item.title,
            details: item.snippet || 'Deskripsi tidak tersedia.',
            link: item.link,
            image: `https://via.placeholder.com/150/${Math.floor(Math.random() * 16777215).toString(16)}`,
          }));

        setRecommendations({
          matematika: formatData(recommendationData.matematika || []),
          fisika: formatData(recommendationData.fisika || []),
        });
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    if (user?.uid) {
      fetchRecommendations();
    }
  }, [user]);

  const scroll = (direction, course) => {
    if (sliderRefs[course]?.current) {
      const { scrollLeft, clientWidth } = sliderRefs[course].current;
      const scrollAmount = clientWidth * 0.8;
      sliderRefs[course].current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="recommendation-container">
      <h3 className="recommendation-title">🤝 Rekomendasi Bacaan</h3>
      {Object.entries(recommendations).map(([course, recs]) => (
        <div key={course} className="recommendation-section">
          <h4 className="recommendation-course-title">
            {course === 'matematika' ? '📘 Matematika' : '📗 Fisika'}
          </h4>
          <div className="recommendation-slider-wrapper">
            <button
              className="arrow-button left-arrow"
              onClick={() => scroll('left', course)}
            >
              <ArrowBackIosIcon />
            </button>
            <div className="recommendation-slider" ref={sliderRefs[course]}>
              {recs.length > 0 ? (
                recs.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <a href={rec.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={rec.image}
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
                <p className="no-recommendations">Tidak ada rekomendasi untuk {course}.</p>
              )}
            </div>
            <button
              className="arrow-button right-arrow"
              onClick={() => scroll('right', course)}
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
