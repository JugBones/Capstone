import React, { useRef } from 'react';
import '../styling/Recommendation.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Recommendation = () => {
  // Mock data for recommendations
  const recommendations = [
    {
      title: '5 Metode Belajar Cepat',
      details: 'Lihat Selengkapnya...',
      image: 'https://via.placeholder.com/150/FF5733',
      label: 'TOP',
    },
    {
      title: 'Cara menghadapi kec...',
      details: 'Lihat Selengkapnya...',
      image: 'https://via.placeholder.com/150/337AFF',
      label: null,
    },
    {
      title: 'Belajar Matematika Dasar',
      details: 'Lihat Selengkapnya...',
      image: 'https://via.placeholder.com/150/33FF57',
      label: null,
    },
    {
      title: 'Tips Efektif Belajar Online',
      details: 'Lihat Selengkapnya...',
      image: 'https://via.placeholder.com/150/FFC300',
      label: null,
    },
  ];

  const sliderRef = useRef(null);

  // Function to scroll the slider
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8; // Adjust the scroll amount
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <h3 className="recommendation-title">🤝 Rekomendasi Bacaan</h3>
      <div className="recommendation-slider-wrapper">
        <button className="arrow-button left-arrow" onClick={() => scroll('left')}>
          <ArrowBackIosIcon />
        </button>
        <div className="recommendation-slider" ref={sliderRef}>
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <img src={rec.image} alt={rec.title} className="recommendation-image" />
              {rec.label && <span className="recommendation-label">{rec.label}</span>}
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
