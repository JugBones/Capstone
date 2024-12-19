import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineCheckCircle,
  AiOutlineBulb,
  AiOutlineFontSize,
  AiOutlineTool,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  FaMountain,
  FaRegCalendarCheck,
  FaRunning,
  FaRoad,
  FaBookOpen,
  FaPuzzlePiece,
  FaRegMoon,
  FaSun,
  FaBolt,
  FaUsers,
  FaBrain,
  FaFire,
} from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import "../styling/Achievements.css";

const badges = [
  { id: 1, title: "Shining Star", progress: 70, status: "In Progress", tip: "Attend all classes for a month to earn this badge!", icon: <AiOutlineStar size={60} color="1E5BF6" /> },
  { id: 2, title: "Consistent Learner", progress: 100, status: "Completed", tip: "", icon: <FaRegCalendarCheck size={60} color="FFD700" /> },
  { id: 3, title: "Perfect Score", progress: 50, status: "In Progress", tip: "Score full marks on quizzes consistently.", icon: <AiOutlineCheckCircle size={60} color="#1E5BF6" /> },
  { id: 4, title: "Challenge Conqueror", progress: 90, status: "In Progress", tip: "Complete all difficult topics for this badge!", icon: <FaMountain size={60} color="#1E5BF6" /> },
  { id: 5, title: "Persistent Performer", progress: 100, status: "Completed", tip: "", icon: <FaRunning size={60} color="#FFD700" /> },
  { id: 6, title: "Sentence Builder", progress: 30, status: "In Progress", tip: "Work on sentence structure exercises.", icon: <AiOutlineFontSize size={60} color="#1E5BF6" /> },
  { id: 13, title: "Marathon Learner", progress: 20, status: "In Progress", tip: "Study for 10 hours continuously.", icon: <FaRoad size={60} color="#1E5BF6" /> },
  { id: 14, title: "Diligent Worker", progress: 50, status: "In Progress", tip: "Complete weekly assignments regularly.", icon: <AiOutlineTool size={60} color="#1E5BF6" /> },
  { id: 15, title: "Creative Thinker", progress: 70, status: "In Progress", tip: "Submit a unique project idea.", icon: <AiOutlineBulb size={60} color="#1E5BF6" /> },
  { id: 16, title: "Knowledge Seeker", progress: 100, status: "Completed", tip: "", icon: <FaBookOpen size={60} color="#FFD700" /> },
  { id: 17, title: "Time Manager", progress: 85, status: "In Progress", tip: "Finish tasks ahead of schedule.", icon: <AiOutlineClockCircle size={60} color="#1E5BF6" /> },
  { id: 18, title: "Logical Genius", progress: 45, status: "In Progress", tip: "Solve 50 logical reasoning problems.", icon: <FaPuzzlePiece size={60} color="#1E5BF6" /> },
  { id: 19, title: "Night Owl", progress: 60, status: "In Progress", tip: "Study late nights consistently.", icon: <FaRegMoon size={60} color="#1E5BF6" /> },
  { id: 20, title: "Early Bird", progress: 95, status: "In Progress", tip: "Start learning early mornings.", icon: <FaSun size={60} color="#1E5BF6" /> },
  { id: 21, title: "Fast Finisher", progress: 100, status: "Completed", tip: "", icon: <FaBolt size={60} color="#FFD700" /> },
  { id: 22, title: "Team Player", progress: 30, status: "In Progress", tip: "Collaborate well in group projects.", icon: <FaUsers size={60} color="#1E5BF6" /> },
  { id: 23, title: "Problem Solver", progress: 40, status: "In Progress", tip: "Solve complex coding challenges.", icon: <FaBrain size={60} color="#1E5BF6" /> },
  { id: 24, title: "Motivated Learner", progress: 75, status: "In Progress", tip: "Set personal learning goals and achieve them!", icon: <FaFire size={60} color="#1E5BF6" /> },
];


const Achievements = () => {
  const [open, setOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleOpen = (badge) => {
    setSelectedBadge(badge);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBadge(null);
  };

  return (
    <div className="achievement-container">
      <h1 className="achievement-title">Lencana Pencapaian</h1>

      <div className="badge-grid">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge-card ${badge.progress === 100 ? "completed" : "in-progress"}`}
            onClick={() => handleOpen(badge)}
          >
            <div className="badge-icon">{badge.icon}</div>
            <p className="badge-title">{badge.title}</p>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="badge-modal">
          {selectedBadge && (
            <>
              <div className="badge-popup-header">{selectedBadge.icon}</div>
              <h2 className="modal-title">{selectedBadge.title}</h2>
              <p className="modal-status">
                Status:{" "}
                <strong style={{ color: selectedBadge.progress === 100 ? "#4CAF50" : "#FFA500" }}>
                  {selectedBadge.status}
                </strong>
              </p>
              <div className="progress-section">
                <p className="progress-text">Progress: {selectedBadge.progress}%</p>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(selectedBadge.progress, 100)}%` }}
                  ></div>
                </div>
                {selectedBadge.progress < 100 && (
                  <p className="remaining-progress">
                    {100 - selectedBadge.progress}% more to achieve this badge! <br />
                    <span className="badge-tip">{selectedBadge.tip}</span>
                  </p>
                )}
              </div>
              {selectedBadge.progress === 100 && (
                <p className="completed-date">
                  Achieved on: <strong>December 22, 2024</strong>
                </p>
              )}
            </>
          )}
        </Box>
      </Modal>

      {/* Legend Section */}
      <div className="legend-container">
        <div className="legend-item">
          <span className="legend-color completed"></span> Completed (Yellow)
        </div>
        <div className="legend-item">
          <span className="legend-color in-progress"></span> In Progress (Blue)
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Achievements;

