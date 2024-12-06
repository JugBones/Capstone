import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styling/Recommendation.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Recommendation = ({ firebaseUid }) => {
  const [recommendations, setRecommendations] = useState([]);
  const sliderRef = useRef(null);

  // Fetch recommendations from the backend
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recommendations/${firebaseUid}`
        );
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (firebaseUid) {
      fetchRecommendations();
    }
  }, [firebaseUid]);

  // Function to scroll the slider
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8; // Adjust the scroll amount
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <h3 className="recommendation-title">🤝 Rekomendasi Bacaan</h3>
      <div className="recommendation-slider-wrapper">
        <button className="arrow-button left-arrow" onClick={() => scroll("left")}>
          <ArrowBackIosIcon />
        </button>
        <div className="recommendation-slider" ref={sliderRef}>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <img src={rec.image || "https://via.placeholder.com/150"} alt={rec.title} className="recommendation-image" />
                {rec.label && <span className="recommendation-label">{rec.label}</span>}
                <div className="recommendation-content">
                  <h4 className="recommendation-card-title">{rec.title}</h4>
                  <p className="recommendation-card-details">
                    <a href={rec.link} target="_blank" rel="noopener noreferrer">
                      {rec.snippet || "Lihat Selengkapnya..."}
                    </a>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada rekomendasi bacaan untuk saat ini.</p>
          )}
        </div>
        <button className="arrow-button right-arrow" onClick={() => scroll("right")}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
