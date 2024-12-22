import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/Appreciation.css";
import { Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Appreciation = ({ user }) => {
  const [appreciations, setAppreciations] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchAppreciations = async () => {
      if (!user?.uid) {
        console.error("User UID is undefined!");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/appreciations/${user.uid}`
        );
        setAppreciations(response.data);
      } catch (error) {
        console.error("Error fetching appreciations:", error);
        setAppreciations([]); // Clear the list on error
      }
    };

    fetchAppreciations();
  }, [user]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle the accordion
  };

  return (
    <div className="appreciation-outer-container">
      <div className="appreciation-container">
        <div className="appreciation-header">
          <span className="thumb-emoji">👍</span>
          <h3 className="appreciation-title">Apresiasi</h3>
        </div>
        <p className="appreciation-description">
          Berikut adalah pesan dari tutor dan AI tentang pembelajaran anak anda.
        </p>
        <div className="appreciation-list">
          {appreciations.length > 0 ? (
            appreciations.map((item, index) => (
              <div
                key={index}
                className={`appreciation-card ${
                  expandedIndex === index ? "expanded" : ""
                } ${
                  item.teacher_name === "AI Feedback" ? "ai-feedback-card" : ""
                }`}
                onClick={() => toggleExpand(index)}
              >
                <Avatar
                  alt={item.teacher_name}
                  src={
                    item.teacher_name === "AI Feedback"
                      ? "/ai-icon.png" // Custom AI avatar
                      : "https://via.placeholder.com/50"
                  }
                  className="appreciation-avatar"
                />
                <div className="appreciation-details">
                  <h4
                    className={`appreciation-teacher ${
                      item.teacher_name === "AI Feedback" ? "ai-feedback" : ""
                    }`}
                  >
                    {item.teacher_name}
                  </h4>
                  <p className="appreciation-message">
                    {expandedIndex === index
                      ? item.message
                      : `${item.message.slice(0, 20)}...`}
                  </p>
                  <p className="appreciation-date">{item.date}</p>
                </div>
                {expandedIndex === index ? (
                  <ExpandLessIcon className="expand-icon" />
                ) : (
                  <ExpandMoreIcon className="expand-icon" />
                )}
              </div>
            ))
          ) : (
            <p>No appreciation data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appreciation;
