import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Recommendation.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

// Importing the images
import MathImage from '../assets/MathImage.png';
import PhysicsImage from '../assets/PhysicsImage.png';
import OtherImage from '../assets/OtherImage.png'; // Importing OtherImage for Lainnya

const Recommendation = ({ user, selectedCourse }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [otherRecommendations, setOtherRecommendations] = useState([]); // For "Lainnya"
  const [filteredRecommendations, setFilteredRecommendations] = useState([]); // For filtered content
  const [activeFilter, setActiveFilter] = useState('course'); // Default filter
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const sliderRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:8000/recommendations/${user.uid}`
        );
        const recommendationData = response.data.recommendations;

        const courseKey = selectedCourse.toLowerCase(); // Ensure the course name matches the keys in the API response (e.g., "matematika", "fisika").
        const courseArticles = recommendationData[courseKey] || [];
        const parentingTips = recommendationData['lainnya'] || [];

        setRecommendations(courseArticles);
        setOtherRecommendations(parentingTips);

        // Set default filtered content
        setFilteredRecommendations(courseArticles);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (user?.uid && selectedCourse) {
      fetchRecommendations();
    }
  }, [user, selectedCourse]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'course') {
      setFilteredRecommendations(recommendations);
    } else if (filter === 'parenting') {
      setFilteredRecommendations(otherRecommendations);
    }
  };

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

  const handleOpenPictureInPicture = (downloadUrl) => {
    navigate('/picture-in-picture', { state: { link: downloadUrl } });
  };

  return (
    <div className="recommendation-container">
      <h3 className="recommendation-title">
        🤝 Rekomendasi Bacaan untuk {selectedCourse} dan Tips Lainnya
      </h3>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${activeFilter === 'course' ? 'active' : ''}`}
          onClick={() => handleFilterChange('course')}
        >
          {selectedCourse}
        </button>
        <button
          className={`filter-button ${activeFilter === 'parenting' ? 'active' : ''}`}
          onClick={() => handleFilterChange('parenting')}
        >
          Parenting
        </button>
      </div>

      {/* Loading Animation */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Memuat rekomendasi...</p>
        </div>
      ) : (
        <div className="recommendation-slider-wrapper">
          <button className="arrow-button left-arrow" onClick={() => scroll('left')}>
            <ArrowBackIosIcon />
          </button>
          <div className="recommendation-slider" ref={sliderRef}>
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="recommendation-card"
                  onClick={() => handleOpenPictureInPicture(rec.link)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={
                      rec.image ||
                      (recommendations.includes(rec) ? defaultImage : OtherImage)
                    } // Use course-specific or OtherImage based on the source
                    alt={rec.title}
                    className="recommendation-image"
                  />
                  <div className="recommendation-content">
                    <h4 className="recommendation-card-title">{rec.title}</h4>
                    <p className="recommendation-card-details">{rec.snippet}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-recommendations">Tidak ada rekomendasi untuk {activeFilter}.</p>
            )}
          </div>
          <button className="arrow-button right-arrow" onClick={() => scroll('right')}>
            <ArrowForwardIosIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
