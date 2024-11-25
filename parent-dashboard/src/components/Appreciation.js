import React, { useState } from 'react';
import '../styling/Appreciation.css';
import { Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Mock data for appreciations
const mockAppreciations = [
  {
    teacherName: 'Ms. Maria',
    message: 'Adi kelas kmrn aktif bertanya dan berpartisipasi dalam diskusi. Dia menunjukkan peningkatan yang luar biasa dalam memahami materi pelajaran.',
    date: '2024-07-08',
    avatar: 'https://via.placeholder.com/50', // Placeholder image for teacher avatar
  },
  {
    teacherName: 'Ms. Maria',
    message: 'Adi menunjukkan peningkatan dalam memahami konsep dasar. Dia juga membantu teman-teman lain selama kelas berlangsung.',
    date: '2024-07-07',
    avatar: 'https://via.placeholder.com/50', // Placeholder image for teacher avatar
  },
];

const Appreciation = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle the accordion
  };

  return (
    <div className="appreciation-container">
      <h3 className="appreciation-title">Apresiasi</h3>
      <p className="appreciation-description">
        Berikut adalah pesan dari tutor yang membantu pembelajaran anak anda.
      </p>
      <div className="appreciation-list">
        {mockAppreciations.map((item, index) => (
          <div
            key={index}
            className={`appreciation-card ${
              expandedIndex === index ? 'expanded' : ''
            }`}
            onClick={() => toggleExpand(index)}
          >
            <Avatar
              alt={item.teacherName}
              src={item.avatar}
              className="appreciation-avatar"
            />
            <div className="appreciation-details">
              <h4 className="appreciation-teacher">{item.teacherName}</h4>
              <p className="appreciation-message">
                {expandedIndex === index
                  ? item.message // Show full message if expanded
                  : `${item.message.slice(0, 20)}...`} {/* Truncate message if collapsed */}
              </p>
              <p className="appreciation-date">{item.date}</p>
            </div>
            {expandedIndex === index ? (
              <ExpandLessIcon className="expand-icon" />
            ) : (
              <ExpandMoreIcon className="expand-icon" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appreciation;
