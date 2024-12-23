import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../styling/Appreciation.css";
import { Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Import assets directly
import teacherAvatar from "../assets/colearn_teacher2.webp";
import aiLogo from "../assets/colearn-logo-square.png";

const Appreciation = ({ user }) => {
  const [appreciations, setAppreciations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchAppreciations = async () => {
      if (!user?.uid) {
        console.error("User UID is undefined!");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/appreciations/${user.uid}`
        );
        setAppreciations(response.data);
      } catch (error) {
        console.error("Error fetching appreciations:", error);
        setAppreciations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppreciations();
  }, [user]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="appreciation-outer-container">
      <div className="appreciation-container">
        <div className="appreciation-header">
          <span className="thumb-emoji">👍</span>
          <h3 className="appreciation-title">Apresiasi</h3>
        </div>
        <p className="appreciation-description">
          Berikut adalah pesan dari tutor dan AI tentang pembelajaran anak Anda.
        </p>
        <div className="appreciation-list">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : appreciations.length > 0 ? (
            appreciations.map((item, index) => (
              <div
                key={index}
                className={`appreciation-card ${
                  expandedIndex === index ? "expanded" : ""
                } ${item.teacher_name === "AI Feedback" ? "ai-feedback-card" : ""}`}
                onClick={() => toggleExpand(index)}
              >
                <Avatar
                  alt={item.teacher_name}
                  src={
                    item.teacher_name === "AI Feedback"
                      ? aiLogo
                      : teacherAvatar
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
                  <ReactMarkdown
                    className="appreciation-message"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer">
                          {props.children}
                        </a>
                      ),
                    }}
                  >
                    {expandedIndex === index
                      ? item.message
                      : `${item.message.slice(0, 200)}...`}
                  </ReactMarkdown>
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
            <p>Tidak ada data apresiasi tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appreciation;
