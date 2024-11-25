import React from 'react';
import '../styling/Achievement.css';

const Achievement = () => {
  // Mock data for achievements
  const achievements = [
    { 
      icon: 'https://via.placeholder.com/50', 
      title: 'Co-Learn Sejati', 
      progress: 5 
    },
    { 
      icon: 'https://via.placeholder.com/50', 
      title: 'Champion Polling', 
      progress: 45 
    },
    { 
      icon: 'https://via.placeholder.com/50', 
      title: 'Champion Polling', 
      progress: 70 
    },
  ];

  // Function to get the bar color based on progress value
  const getBarColor = (progress) => {
    if (progress <= 35) return 'red';
    if (progress < 50) return 'orange';
    if (progress >= 50 && progress <= 60) return 'yellow';
    if (progress > 60) return 'blue';
    return 'gray';
  };

  return (
    <div>
      <h3 className="achievement-title">🏅 Cek Pencapaian <span className="highlight">Adi</span> disini!</h3>
      <div className="achievement-list">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <img src={achievement.icon} alt={achievement.title} className="achievement-icon" />
            <div className="achievement-details">
              <h4 className="achievement-name">{achievement.title}</h4>
              <div 
                className="progress-bar" 
                style={{ backgroundColor: '#e0e0e0' }} // Default bar background
              >
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${achievement.progress}%`, 
                    backgroundColor: getBarColor(achievement.progress), // Dynamic color
                  }}
                ></div>
              </div>
              <span className="progress-percentage">{achievement.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      <a href="https://pcuk.org/achievement-badges/" className="see-more">Lihat Selengkapnya..</a>
    </div>
  );
};

export default Achievement;
