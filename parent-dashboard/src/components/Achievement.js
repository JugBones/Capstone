import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineStar,
  AiOutlineCheckCircle,
  AiOutlineBulb,
} from "react-icons/ai";
import "../styling/Achievement.css";

const Achievement = () => {
  const achievements = [
    {
      icon: <AiOutlineStar size={50} color="#1E5BF6" />,
      title: "Shining Star",
      progress: 30,
    },
    {
      icon: <AiOutlineCheckCircle size={50} color="#FFD700" />,
      title: "Consistent Learner",
      progress: 75,
    },
    {
      icon: <AiOutlineBulb size={50} color="#1E5BF6" />,
      title: "Creative Thinker",
      progress: 90,
    },
  ];

  const navigate = useNavigate();

  const getBarColor = (progress) => {
    if (progress <= 35) return "red";
    if (progress < 50) return "orange";
    if (progress >= 50 && progress <= 60) return "yellow";
    if (progress > 60) return "blue";
    return "gray";
  };

  const handleAchievementClick = () => {
    navigate("/achievements");
  };

  return (
    <div className="achievement-container">
      <h3 className="achievement-title">
        🏅 Cek Pencapaian <span className="highlight">Adi</span> disini!
      </h3>
      <div className="achievement-list">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-details">
              <h4 className="achievement-name">{achievement.title}</h4>
              <div className="progress-bar" style={{ backgroundColor: "#e0e0e0" }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${achievement.progress}%`,
                    backgroundColor: getBarColor(achievement.progress),
                  }}
                ></div>
              </div>
              <span className="progress-percentage">{achievement.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      <p className="see-more" onClick={handleAchievementClick}>
        Lihat Selengkapnya..
      </p>
    </div>
  );
};

export default Achievement;
